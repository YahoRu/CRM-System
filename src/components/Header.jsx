import { useState } from 'react'
import styles from './Header.module.scss'

export default function Header({ addTask, error, setError }) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const title = inputValue
    if (title.length >= 2 && title.length <= 64) {
      addTask(title)
      setInputValue('')
    }
  }

  return (
    <section className={styles.header}>
      <form className={styles.headerForm} onSubmit={handleSubmit}>
          <input
            className={styles.headerInput}
            placeholder="Task To Be Done..."
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            minLength={2}
            maxLength={64}
            required
          />
        <button type="submit" className={styles.btnAdd}>
          Add
        </button>
      </form>
      {error && (
        <div className={styles.errorMessage}>
          {error.message}
          <button onClick={() => setError(null)}>Закрыть</button>
        </div>
      )}
    </section>
  )
}
