import {
  act,
  render,
  renderHook,
  screen,
  waitFor
} from '@testing-library/react'

import { useDeck } from '../../../../hooks/useDeck'
import { DrawCardComponent } from '../../../../components/gameControls/components/DrawCardComponent'

describe('DrawCardComponent tests', () => {
  test('DrawCardComponent renders correctly', () => {
    const { container } = render(<DrawCardComponent />)
    // create a new snapshot file
    expect(container).toMatchSnapshot()
  })

  test('should be disable for a second once its called', async () => {
    const { result } = renderHook(() => useDeck())

    await waitFor(() => {})

    const { drawCard, gameFinished } = result.current
    render(
      <DrawCardComponent drawCard={drawCard} gameFinished={gameFinished} />
    )
    screen.debug()
    const button = screen.getByRole('button')
    act(() => {
      button.click()
    })
    expect(button.disabled).toBe(true)
    await waitFor(
      () => {
        expect(button.disabled).toBe(false)
      },
      { timeout: 1100 }
    )
  })
})
