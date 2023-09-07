import { act, renderHook, waitFor } from '@testing-library/react'
import { useDeck } from '../../hooks/useDeck'

describe('useDesk Tests', () => {
  const currentDeckInitialState = {
    deck_id: '',
    remaining: 0,
    shuffled: false
  }
  const resultsInitialState = {
    clubs: [],
    diamonds: [],
    hearts: [],
    spades: []
  }

  test('should return default values', () => {
    const { result } = renderHook(() => useDeck())
    const {
      backOfCardImage,
      currentDeck,
      drawCard,
      gameFinished,
      playerPile,
      queenCounter,
      resetGame,
      results
    } = result.current

    expect(backOfCardImage).toBe(
      'https://deckofcardsapi.com/static/img/back.png'
    )
    expect(currentDeck).toEqual(currentDeckInitialState)
    expect(drawCard).toBeInstanceOf(Function)
    expect(gameFinished).toBe(false)
    expect(playerPile).toEqual([])
    expect(queenCounter).toBe(0)
    expect(resetGame).toBeInstanceOf(Function)
    expect(results).toEqual(resultsInitialState)
  })

  test('should create a deck once the hook is called', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })
  })

  test('should give the user a new card', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })

    const { drawCard } = result.current

    await act(async () => {
      await drawCard()
    })
    expect(result.current.playerPile.length).toBe(1)
  })

  test('should restart the game', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })

    const { drawCard, resetGame } = result.current

    await act(async () => {
      await drawCard()
      await resetGame()
    })
    expect(result.current.playerPile.length).toBe(0)
  })

  test('should calculate the results', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })

    const { playerPile, finishGame } = result.current

    playerPile.push({ code: '2C', value: '2', img: 'img' })
    playerPile.push({ code: 'AC', value: 'ACE', img: 'img' })
    playerPile.push({ code: 'QC', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QD', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QH', value: 'QUEEN', img: 'img' })
    playerPile.push({ code: 'QS', value: 'QUEEN', img: 'img' })

    act(() => {
      finishGame()
    })
    expect(result.current.results.clubs.length).toBe(3)
    expect(result.current.results.diamonds.length).toBe(1)
    expect(result.current.results.hearts.length).toBe(1)
    expect(result.current.results.spades.length).toBe(1)
    expect(result.current.results.clubs).toEqual(['ACE', '2', 'QUEEN'])
  })
})
