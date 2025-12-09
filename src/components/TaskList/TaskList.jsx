import styles from './TaskList.module.scss'
import TodoItem from '../TodoItem/TodoItem.jsx'

export default function TasksList({
  tasks,
  isLoading,
  setError,
  fetchTaskList,
}) {
  return (
    <section className={styles.tasksSection}>

      {isLoading && <div className={styles.loading}>Загрузка...</div>}

      <ul className={styles.tableList}>
        {!isLoading &&
          tasks.data.map((toDo) => (
            <TodoItem
              key={toDo.id}
              toDo={toDo}
              setError={setError}
              fetchTaskList={fetchTaskList}
            />
          ))}
      </ul>
    </section>
  )
}
