import { AnimatePresence, motion } from 'framer-motion'

import './styles.css'

export const DeckComponent = ({ playerPile, backOfCardImage }) => {
  const renderRows = () => {
    const rows = []
    let currentRow = []
    let currentRowHeight = 0

    playerPile.forEach(({ code, img }, index) => {
      currentRow.push(
        <motion.figure
          key={code}
          className='card-figure'
          initial={{
            opacity: 1,
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          animate={{
            top: `${currentRowHeight}px`,
            left: `${25 * (index % 10)}px`,
            transform: 'translateX(0%)'
          }}
          exit={{ opacity: 0, left: 0, transform: 'translateX(-100%)' }}
        >
          <img src={img} alt={`card ${code}`} />
        </motion.figure>
      )

      if (currentRow.length === 10 || index === playerPile.length - 1) {
        rows.push(
          <div
            key={`row-${rows.length}`}
            className='card-row'
            style={{ top: `${currentRowHeight}px` }}
          >
            {currentRow}
          </div>
        )
        currentRowHeight += 50
        currentRow = []
      }
    })

    return rows
  }

  return (
    <section className='deck-container'>
      <figure id='cpu-deck' className='card-figure' data-testid='cpu-deck'>
        <img src={backOfCardImage} alt='cpu deck' data-testid='cpu-deck-img' />
      </figure>
      <AnimatePresence>
        {playerPile.length !== 0 && renderRows().map((row) => row)}
      </AnimatePresence>
    </section>
  )
}
