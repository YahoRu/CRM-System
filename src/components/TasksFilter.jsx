import styles from './TasksFilter.module.scss'

export default function TasksFilter({
  allTasks,
  selectedTasks,
  typeOfTasks,
  setTypeOfTasks,
}) {
  function handleMenuButton(event) {
    setTypeOfTasks(event.currentTarget.id)
  }

  return (
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
  )
}
