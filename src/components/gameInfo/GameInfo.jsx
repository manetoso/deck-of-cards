import { GameResults } from './components/GameResults'
import './styles.css'

export const GameInfo = ({ queenCounter, currentDeck, results }) => {
  return (
    <>
      <section className='game-info'>
        <span className='label'>
          Queen Counter: <b>{queenCounter}</b>
        </span>
        <span className='label'>
          Remaining cards: <b>{currentDeck.remaining}</b>
        </span>
      </section>
      <>{results.clubs.length !== 0 && <GameResults results={results} />}</>
    </>
  )
}
