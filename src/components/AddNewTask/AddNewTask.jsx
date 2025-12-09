import { useState } from 'react'
import { createTask } from '../../api/api'
import { validateTaskTitle } from '../../helpers/validateTaskTitle'

import Button from '../../ui/Button/Button.jsx'
import styles from './AddNewTask.module.scss'

export default function AddNewTask({ handleTaskCreated, setError }) {
  const [taskTitle, setTaskTitle] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateTaskTitle(taskTitle)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await createTask(taskTitle.trim())
      handleTaskCreated()
      setTaskTitle('')
    } catch (error) {
      setError('Не удалось добавить задачу.')
    }
  }

  function handleTaskTitleChange(event) {
    setTaskTitle(event.target.value)
  }

  return (
    <section className={styles.header}>
      <form className={styles.headerForm} onSubmit={handleSubmit}>
        <input
          className={styles.headerInput}
          placeholder="Task To Be Done..."
          type="text"
          value={taskTitle}
          onChange={handleTaskTitleChange}
        />
        <Button type="submit" colorPaletteKey="primary" >Add</Button>
      </form>
    </section>
  )
}
