import styles from './TodoItem.module.scss'
import binIcon from '../assets/icon-bin.png'
import editIcon from '../assets/icon-edit.png'
import cancelIcon from '../assets/icon-cancel.png'
import saveIcon from '../assets/icon-save.png'

export default function TodoItem({
  toDo,
  editedTaskId,
  editedTaskText,
  inputValidationFailed,
  setInputValidationFailed,
  startEditingTask,
  cancelEditingTask,
  handleOnChangeInput,
  saveEditedTask,
  isDoneSwitcher,
  deleteTask,
}) {
  const isEditing = editedTaskId === toDo.id

  return (
    <li className={styles.table} key={toDo.id}>
      <input
        id={`${toDo.id}-${toDo.isDone}`}
        type="checkbox"
        checked={toDo.isDone}
        onChange={() => isDoneSwitcher(toDo.id)}
      />
      {isEditing ? (
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
            onChange={(event) => handleOnChangeInput(event.target.value)}
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
            <button type="submit" className={`${styles.btn} ${styles.btnSave}`}>
              <img className={styles.btnIcon} src={saveIcon} alt="save icon" />
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
              <img className={styles.btnIcon} src={editIcon} alt="edit icon" />
            </button>
            <button
              className={`${styles.btn} ${styles.btnDelete}`}
              onClick={() => deleteTask(toDo.id)}
            >
              <img className={styles.btnIcon} src={binIcon} alt="delete icon" />
            </button>
          </div>
        </>
      )}
    </li>
  )
}
