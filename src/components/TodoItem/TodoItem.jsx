import { useState } from 'react'
import { validateTaskTitle } from '../../helpers/validateTaskTitle.js'
import { updateTask, deleteTask } from '../../api/api.js'

import { COLOR_PALETTE } from '../../ui/colors.js'
import styles from './TodoItem.module.scss'
import binIcon from '../../assets/icon-bin.png'
import editIcon from '../../assets/icon-edit.png'
import cancelIcon from '../../assets/icon-cancel.png'
import saveIcon from '../../assets/icon-save.png'
import IconButton from '../../ui/IconButton/IconButton.jsx'

export default function TodoItem({ toDo, setError, fetchTaskList }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(toDo.title)

  async function saveEditedTask() {
    const validationError = validateTaskTitle(editedText)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await updateTask(toDo.id, {
        title: editedText.trim(),
        isDone: toDo.isDone,
      })
      fetchTaskList()
      setIsEditing(false)
    } catch (error) {
      setError('Не удалось обновить задачу!')
    }
  }

  async function handleTaskIsDoneSwitcher() {
    try {
      await updateTask(toDo.id, {
        title: toDo.title,
        isDone: !toDo.isDone,
      })
      fetchTaskList()
    } catch (error) {
      setError('Не удалось изменить статус!')
    }
  }

  async function handleDeleteTask() {
    try {
      await deleteTask(toDo.id)
      fetchTaskList()
    } catch (error) {
      setError('Не удалось удалить задачу!')
    }
  }

  function startEditingTask() {
    setIsEditing(true)
    setEditedText(toDo.title)
  }

  function cancelEditingTask() {
    setIsEditing(false)
    setEditedText(toDo.title)
  }

  function handleOnSubmit(event) {
    event.preventDefault()
    saveEditedTask()
  }

  return (
    <li style={{ backgroundColor: COLOR_PALETTE.secondary }} className={styles.table} key={toDo.id}>
      <input
        style={{ accentColor: COLOR_PALETTE.success }}
        type="checkbox"
        checked={toDo.isDone}
        onChange={handleTaskIsDoneSwitcher}
      />
      {isEditing ? (
        <form className={styles.tableEditForm} onSubmit={handleOnSubmit}>
          <input
            id={`${toDo.id}-${toDo.title}`}
            className={styles.tableTitle}
            type="text"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
          />
          <div className={styles.tableActions}>
            <IconButton type="submit" colorPaletteKey="primary">
              <img className={styles.icon} src={saveIcon} alt="save icon" />
            </IconButton>
            <IconButton
              type="submit"
              colorPaletteKey="primary"
              onClick={cancelEditingTask}
            >
              <img className={styles.icon} src={cancelIcon} alt="cancel icon" />
            </IconButton>
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
            <IconButton
              type="button"
              colorPaletteKey="primary"
              onClick={() => startEditingTask(toDo)}
            >
              <img className={styles.icon} src={editIcon} alt="edit icon" />
            </IconButton>
            <IconButton
              type="button"
              colorPaletteKey="danger"
              onClick={handleDeleteTask}
            >
              <img className={styles.icon} src={binIcon} alt="delete icon" />
            </IconButton>
          </div>
        </>
      )}
    </li>
  )
}
