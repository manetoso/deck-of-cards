import { useState, useCallback, useEffect } from 'react'
import { deckApi, backOfCardImage } from '../api/deckApi'

/**
 * QC = Queen of Clubs
 * QD = Queen of Diamonds
 * QH = Queen of Hearts
 * QS = Queen of Spades
 */

const resultsInitialState = {
  clubs: [],
  diamonds: [],
  hearts: [],
  spades: []
}

export const useDeck = () => {
  const [currentDeck, setCurrentDeck] = useState({
    deck_id: '',
    remaining: 0,
    shuffled: false
  })
  const [playerPile, setPlayerPile] = useState([])
  const [queenCounter, setQueenCounter] = useState(0)
  const [gameFinished, setGameFinished] = useState(false)
  const [results, setResults] = useState(resultsInitialState)

  const createDeck = useCallback(async () => {
    try {
      const { data } = await deckApi.get('/new/shuffle/?deck_count=1')
      const { success, ...rest } = data
      setCurrentDeck(rest)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const drawCard = async () => {
    if (currentDeck.remaining === 0) return alert('No more cards in deck')
    try {
      const { data } = await deckApi.get(
        `/${currentDeck.deck_id}/draw/?count=1`
      )
      const { cards, remaining } = data
      const {
        code,
        value,
        images: { svg }
      } = cards[0]
      setPlayerPile([...playerPile, { code, value, img: svg }])
      setCurrentDeck({ ...currentDeck, remaining })
      if (code.includes('Q')) setQueenCounter(queenCounter + 1)
    } catch (error) {
      console.error(error)
    }
  }

  const resetGame = async () => {
    await createDeck()
    setGameFinished(false)
    setResults(resultsInitialState)
    setPlayerPile([])
    setQueenCounter(0)
  }

  const searchQuenInPile = (pile, suit) => {
    const pileOdSuit = pile.filter((card) => card.code.includes(suit))
    const queenIndex = pileOdSuit.findIndex((card) => card.code.includes('Q'))
    const newPile = pileOdSuit.slice(0, queenIndex + 1)

    const compareCardValues = (a, b) => {
      const cardValues = 'A1234567890JQK' // Define the order of card values
      const aValue = cardValues.indexOf(a.code.charAt(0))
      const bValue = cardValues.indexOf(b.code.charAt(0))
      return aValue - bValue
    }
    newPile.sort(compareCardValues)
    return newPile
  }

  const finishGame = () => {
    setGameFinished(true)
    alert('Game Finished!')
    const clubsPile = searchQuenInPile(playerPile, 'C')
    const diamondsPile = searchQuenInPile(playerPile, 'D')
    const heartsPile = searchQuenInPile(playerPile, 'H')
    const spadesPile = searchQuenInPile(playerPile, 'S')
    const clubs = clubsPile.map((card) => card.value)
    const diamonds = diamondsPile.map((card) => card.value)
    const hearts = heartsPile.map((card) => card.value)
    const spades = spadesPile.map((card) => card.value)
    setResults({
      clubs,
      diamonds,
      hearts,
      spades
    })
  }

  useEffect(() => {
    if (queenCounter === 4) {
      finishGame()
    }
  }, [queenCounter])

  useEffect(() => {
    createDeck()
  }, [createDeck])

  return {
    backOfCardImage,
    currentDeck,
    drawCard,
    gameFinished,
    playerPile,
    queenCounter,
    resetGame,
    results
  }
}
