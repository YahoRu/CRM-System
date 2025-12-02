import { useState } from 'react'
import styles from './TaskList.module.scss'

import binIcon from '../assets/icon-bin.png'
import editIcon from '../assets/icon-edit.png'
import cancelIcon from '../assets/icon-cancel.png'
import saveIcon from '../assets/icon-save.png'

export default function TaskList({
  allTasks,
  typeOfTasks,
  setTypeOfTasks,
  isLoading,
  error,
  setError,
  isDoneSwitcher,
  deleteTask,
  updateTaskTitle,
  selectedTasks,
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

  function handleMenuButton(event) {
    setTypeOfTasks(event.currentTarget.id)
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
      <menu className={styles.taskFilters}>
        <button
          id={selectedTasks[0]}
          className={selectedTasks[0] === typeOfTasks ? styles.active : ''}
          onClick={handleMenuButton}
        >
          Все ({allTasks?.info?.all || 0})
        </button>
        <button
          id={selectedTasks[1]}
          className={selectedTasks[1] === typeOfTasks ? styles.active : ''}
          onClick={handleMenuButton}
        >
          В работе ({allTasks?.info?.inWork || 0})
        </button>
        <button
          id={selectedTasks[2]}
          className={selectedTasks[2] === typeOfTasks ? styles.active : ''}
          onClick={handleMenuButton}
        >
          Сделано ({allTasks?.info?.completed || 0})
        </button>
      </menu>

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
            <li className={styles.table} key={toDo.id}>
              <input
                id={`${toDo.id}-${toDo.isDone}`}
                type="checkbox"
                checked={toDo.isDone}
                onChange={() => isDoneSwitcher(toDo.id)}
              />
              {editedTaskId === toDo.id ? (
                <form
                  className={styles.tableEditForm}
                  onSubmit={(event) => {
                    event.preventDefault()
                    saveEditedTask(toDo.id)
                  }}
                >
                  <input
                    id={`${toDo.id}-${toDo.title}`}
                    className={styles.tableTitle}
                    type="text"
                    value={editedTaskText}
                    minLength={2}
                    maxLength={64}
                    required
                    onChange={(event) =>
                      handleOnChangeInput(event.target.value)
                    }
                  />
                  {inputValidationFailed && (
                    <p
                      className={styles.inputTooltip}
                      onClick={() => setInputValidationFailed('')}
                    >
                      {inputValidationFailed}
                    </p>
                  )}
                  <div className={styles.tableActions}>
                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnSave}`}
                    >
                      <img
                        className={styles.btnIcon}
                        src={saveIcon}
                        alt="save icon"
                      />
                    </button>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnCancel}`}
                      onClick={cancelEditingTask}
                    >
                      <img
                        className={styles.btnIcon}
                        src={cancelIcon}
                        alt="cancel icon"
                      />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p
                    className={`${styles.tableTitle} ${toDo.isDone ? styles.lineThrough : ''}`}
                  >
                    {toDo.title}
                  </p>

                  <div className={styles.tableActions}>
                    <button
                      className={`${styles.btn} ${styles.btnEdit}`}
                      onClick={() => startEditingTask(toDo)}
                    >
                      <img
                        className={styles.btnIcon}
                        src={editIcon}
                        alt="edit icon"
                      />
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnDelete}`}
                      onClick={() => deleteTask(toDo.id)}
                    >
                      <img
                        className={styles.btnIcon}
                        src={binIcon}
                        alt="delete icon"
                      />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
    </section>
  )
}
