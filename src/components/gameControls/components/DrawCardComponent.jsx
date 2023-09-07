import { useEffect, useState } from 'react'

export function DrawCardComponent({ drawCard, gameFinished }) {
  const [buttonDisable, setButtonDisable] = useState(false)

  const handleButtonClick = async () => {
    if (buttonDisable) return

    // setButtonDisable(true)
    await drawCard()
  }

  useEffect(() => {
    if (buttonDisable) {
      const timeout = setTimeout(() => {
        setButtonDisable(false)
      }, 1000)

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timeout)
    }
  }, [buttonDisable])
  return (
    <button className='btn' disabled={gameFinished | buttonDisable} onClick={handleButtonClick}>
      Draw a Card
    </button>
  )
}
