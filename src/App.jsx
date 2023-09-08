import { DeckComponent } from './components/deckComponent'
import { GameControls } from './components/gameControls'
import { GameInfo } from './components/gameInfo'
import { useDeck } from './hooks/useDeck'

function App() {
  const {
    backOfCardImage,
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
      <main>
        <GameControls
          drawCard={drawCard}
          gameFinished={gameFinished}
          resetGame={resetGame}
        />
        <GameInfo
          queenCounter={queenCounter}
          currentDeck={currentDeck}
          results={results}
        />
        <DeckComponent
          playerPile={playerPile}
          backOfCardImage={backOfCardImage}
        />
      </main>
    </>
  )
}

export default App
