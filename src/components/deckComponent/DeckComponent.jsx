import './styles.css'
export const DeckComponent = ({ playerPile }) => {
  return (
    <section className='deck-container'>
      {playerPile.length !== 0 &&
        playerPile.map(({ code, img }, index) => (
          <figure key={code} className='card-figure'>
            <img src={img} alt={`card ${code}`} />
          </figure>
        ))}
    </section>
  )
}
