import { useState } from 'react'

import styles from './TaskList.module.scss'
import TodoItem from './TodoItem'

export default function TasksList({
  allTasks,
  isLoading,
  error,
  setError,
  isDoneSwitcher,
  deleteTask,
  updateTaskTitle,
}) {
  const [editedTaskId, setEditedTaskId] = useState(null)
  const [editedTaskText, setEditedTaskText] = useState('')
  const [inputValidationFailed, setInputValidationFailed] = useState('')

  function startEditingTask(task) {
    setEditedTaskId(task.id)
    setEditedTaskText(task.title)
  }

  function cancelEditingTask() {
    setEditedTaskId(null)
    setEditedTaskText('')
  }

  function handleOnChangeInput(value) {
    setEditedTaskText(value)
    setInputValidationFailed('')
  }

  async function saveEditedTask(taskId) {
    const title = editedTaskText.trim()

    if (title.length < 2 || title.length > 64) {
      setInputValidationFailed(
        'Введите от 2 до 64 символов без учета пробелов в начале и конце строки',
      )
      return
    }

    await updateTaskTitle(taskId, title)
    cancelEditingTask()
  }

  return (
    <section className={styles.tasksSection}>
      <ul className={styles.tableList}>
        {error && (
          <li className={styles.errorMessage}>
            {error.message}
            <button onClick={() => setError(null)}>Закрыть</button>
          </li>
        )}

        {isLoading && <li className={styles.loading}>Загрузка...</li>}

        {!isLoading &&
          !error &&
          allTasks.data.map((toDo) => (
            <TodoItem
              key={toDo.id}
              toDo={toDo}
              editedTaskId={editedTaskId}
              editedTaskText={editedTaskText}
              inputValidationFailed={inputValidationFailed}
              setInputValidationFailed={setInputValidationFailed}
              startEditingTask={startEditingTask}
              cancelEditingTask={cancelEditingTask}
              handleOnChangeInput={handleOnChangeInput}
              saveEditedTask={saveEditedTask}
              isDoneSwitcher={isDoneSwitcher}
              deleteTask={deleteTask}
            />
          ))}
      </ul>
    </section>
  )
}
