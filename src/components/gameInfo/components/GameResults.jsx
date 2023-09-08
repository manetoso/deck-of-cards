import { AnimatePresence, motion } from 'framer-motion'
export function GameResults({ results }) {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3>Results:</h3>
        <small>
          *In the results only appear the cards that came out before the Queen
          of every suit*
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
      </motion.section>
    </AnimatePresence>
  )
}
