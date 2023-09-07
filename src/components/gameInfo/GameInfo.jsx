import { GameResults } from './components/GameResults'
import './styles.css'

export const GameInfo = ({ queenCounter, currentDeck, results }) => {
  return (
    <>
      <section className='game-info'>
        <span>Queen Counter: {queenCounter}</span>
        <span>Remaining cards: {currentDeck.remaining}</span>
      </section>
      <>
        {results.clubs.length !== 0 && <GameResults results={results} />}
      </>
    </>
  )
}
