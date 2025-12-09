import styles from './TasksFilter.module.scss'
import Tab from '../../ui/Tab/Tab'

export default function TasksFilter({
  tasks,
  selectedTasks,
  typeOfTasks,
  setTypeOfTasks,
}) {
  function handleMenuButton(event) {
    setTypeOfTasks(event.currentTarget.id)
  }

  return (
    <Tab>
      <button
        role="tab"
        id={selectedTasks[0]}
        className={`${selectedTasks[0] === typeOfTasks ? styles.active : ''} ${styles.btn}`}
        onClick={handleMenuButton}
      >
        Все ({tasks?.info?.all || 0})
      </button>
      <button
        role="tab"
        id={selectedTasks[1]}
        className={`${selectedTasks[1] === typeOfTasks ? styles.active : ''} ${styles.btn}`}
        onClick={handleMenuButton}
      >
        В работе ({tasks?.info?.inWork || 0})
      </button>
      <button
        role="tab"
        id={selectedTasks[2]}
        className={`${selectedTasks[2] === typeOfTasks ? styles.active : ''} ${styles.btn}`}
        onClick={handleMenuButton}
      >
        Сделано ({tasks?.info?.completed || 0})
      </button>
    </Tab>
  )
}
