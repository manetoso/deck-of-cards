import { render, renderHook, screen, waitFor } from '@testing-library/react'

import { useDeck } from '../../../hooks/useDeck'
import { GameControls } from '../../../components/gameControls'

describe('GameControls tests', () => {
  test('GameControls renders two buttons', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {})
    const { drawCard, gameFinished, resetGame } = result.current
    render(
      <GameControls
        drawCard={drawCard}
        gameFinished={gameFinished}
        resetGame={resetGame}
      />
    )
    const button = screen.getAllByRole('button')
    expect(button.length).toBe(2)
  })
})
