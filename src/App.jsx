import { DrawCardComponent } from './components/DrawCardComponent'
import { useDeck } from './hooks/useDeck'

function App() {
  const {
    // backOfCardImage,
    currentDeck,
    drawCard,
    gameFinished,
    playerPile,
    queenCounter,
    resetGame,
    results
  } = useDeck()
  return (
    <>
      <header className='header'>
        <h1>Deck of Cards - Emmanuel</h1>
      </header>
      <DrawCardComponent drawCard={drawCard} gameFinished={gameFinished} />
      <button onClick={resetGame}>Reset Game</button>
      <pre>
        Current Deck <code>{JSON.stringify(currentDeck, null, 2)}</code>
      </pre>
      <pre>
        Queen Counter <code>{JSON.stringify(queenCounter, null, 2)}</code>
      </pre>
      <pre>
        Results:{' '}
        {results.clubs.length !== 0 && (
          <>
            <span>
              <b>Clubs: </b>
              {results.clubs.join(', ')}{' '}
            </span>
            <span>
              <b>Diamonds: </b>
              {results.diamonds.join(', ')}{' '}
            </span>
            <span>
              <b>Hearts: </b>
              {results.hearts.join(', ')}{' '}
            </span>
            <span>
              <b>Spades: </b>
              {results.spades.join(', ')}{' '}
            </span>
          </>
        )}
      </pre>
      <pre>
        Player Deck <code>{JSON.stringify(playerPile, null, 2)}</code>
      </pre>
    </>
  )
}

export default App
