import { render, renderHook, screen, waitFor } from '@testing-library/react'

import { useDeck } from '../../../hooks/useDeck'
import { DeckComponent } from '../../../components/deckComponent/DeckComponent'
import { act } from 'react-dom/test-utils'

describe('DeckComponent Tests', () => {
  const currentDeckInitialState = {
    deck_id: '',
    remaining: 0,
    shuffled: false
  }
  test('should render the CPU Deck', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })
    const { backOfCardImage, playerPile } = result.current
    render(
      <DeckComponent
        playerPile={playerPile}
        backOfCardImage={backOfCardImage}
      />
    )
    // screen.debug()
    const cpuDeck = screen.getByTestId('cpu-deck')
    const cpuDeckImage = screen.getByRole('img')
    expect(cpuDeck).toBeTruthy()
    expect(cpuDeck.childNodes.length).toBe(1)
    expect(cpuDeckImage.src).toBe(backOfCardImage)
  })

  test('should render the Player Deck', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {
      expect(result.current.currentDeck).not.toEqual(currentDeckInitialState)
    })
    await act(async () => {
      await result.current.drawCard()
    })
    await act(async () => {
      await result.current.drawCard()
    })
    const { backOfCardImage, playerPile } = result.current
    render(
      <DeckComponent
        playerPile={playerPile}
        backOfCardImage={backOfCardImage}
      />
    )
    screen.debug()
    const gameCardImages = screen.getAllByRole('img')
    gameCardImages.shift()
    expect(gameCardImages.length).toBe(2)
    gameCardImages.forEach((image) => {
      expect(image.src).not.toBe(backOfCardImage)
    })
  })
})
