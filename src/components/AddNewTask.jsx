import { useState } from 'react'
import styles from './AddNewTask.module.scss'

export default function AddNewTask({ addTask }) {
  const [inputValue, setInputValue] = useState('')
  const [inputValidationFailed, setInputValidationFailed] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const title = inputValue.trim()

    if (title.length < 2 || title.length > 64) {
      setInputValidationFailed(
        'Введите от 2 до 64 символов без учета пробелов в начале и конце строки',
      )
      return
    }

    setInputValidationFailed('')
    addTask(title)
    setInputValue('')
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
    if (inputValidationFailed) {
      setInputValidationFailed('')
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
          onChange={handleInputChange}
          minLength={2}
          maxLength={64}
          required
        />
        {inputValidationFailed && (
          <p
            className={styles.inputTooltip}
            onClick={() => setInputValidationFailed('')}
          >
            {inputValidationFailed}
          </p>
        )}
        <button type="submit" className={styles.btnAdd}>
          Add
        </button>
      </form>
    </section>
  )
}
