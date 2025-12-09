import { useEffect } from 'react'

import styles from './Error.module.scss'

export default function Error({ error, setError }) {
  useEffect(() => {
    if (!error) return

    const errorDisplayTime = setTimeout(() => {
      setError()
    }, 3000)
    
    return () => clearTimeout(errorDisplayTime)
  }, [error])

  if (!error) return null

  return <p className={styles.error}>{error}</p>
}