import { DrawCardComponent } from './components/DrawCardComponent'
import './styles.css'

export function GameControls({ drawCard, gameFinished, resetGame }) {
  return (
    <section className='game-controls'>
      <DrawCardComponent drawCard={drawCard} gameFinished={gameFinished} />
      <button className='btn btn-danger' onClick={resetGame}>Reset Game</button>
    </section>
  )
}
