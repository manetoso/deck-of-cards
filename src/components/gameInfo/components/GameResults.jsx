export function GameResults({ results }) {
  return (
    <>
      <h3>Results:</h3>
      <small>
        *In the results only appear the cards that came out before the Queen of
        every suit*
      </small>
      <section className='game-results'>
        <p>
          <strong>Clubs:</strong> {results.clubs.join(', ')}
        </p>
        <p>
          <strong>Diamonds:</strong> {results.diamonds.join(', ')}
        </p>
        <p>
          <strong>Hearts:</strong> {results.hearts.join(', ')}
        </p>
        <p>
          <strong>Spades:</strong> {results.spades.join(', ')}
        </p>
      </section>
    </>
  )
}
