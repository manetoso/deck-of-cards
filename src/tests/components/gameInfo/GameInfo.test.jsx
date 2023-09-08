import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { useDeck } from '../../../hooks/useDeck'
import { GameInfo } from '../../../components/gameInfo'
import { act } from 'react-dom/test-utils'

describe('GameInfo Tests', () => {
  const currentDeckInitialState = {
    deck_id: '',
    remaining: 0,
    shuffled: false
  }

  test('GameInfo renders two spans with info of the game', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })
    const { currentDeck, queenCounter, results } = result.current
    render(
      <GameInfo
        currentDeck={currentDeck}
        queenCounter={queenCounter}
        results={results}
      />
    )
    // console.log({ currentDeck: result.current.currentDeck })
    // screen.debug()
    const queenCounterLabel = screen.getByText(/Queen Counter:/i)
    const remainingCardsLabel = screen.getByText(/Remaining cards:/i)
    expect(queenCounterLabel).toBeTruthy()
    expect(remainingCardsLabel).toBeTruthy()
  })
  test('GameInfo should display the result once the game has finished', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })
    const { currentDeck, finishGame, playerPile } =
      result.current

    playerPile.push({ code: '2C', value: '2', img: 'img' })
    playerPile.push({ code: 'AC', value: 'ACE', img: 'img' })
    playerPile.push({ code: 'QC', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QD', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QH', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QS', value: 'QUEEN', img: 'img' })
    act(() => {
      finishGame()
    })

    render(
      <GameInfo
        currentDeck={currentDeck}
        queenCounter={result.current.queenCounter}
        results={result.current.results}
      />
    )
    // console.log({ currentDeck: result.current.currentDeck })
    // screen.debug()
    const clubsResultsLabel = screen.getByText(/Clubs:/i)
    const diamondsResultsLabel = screen.getByText(/Diamonds:/i)
    const heartsResultsLabel = screen.getByText(/Hearts:/i)
    const spadesResultsLabel = screen.getByText(/Spades:/i)
    expect(clubsResultsLabel).toBeTruthy()
    expect(diamondsResultsLabel).toBeTruthy()
    expect(heartsResultsLabel).toBeTruthy()
    expect(spadesResultsLabel).toBeTruthy()
  })
})
