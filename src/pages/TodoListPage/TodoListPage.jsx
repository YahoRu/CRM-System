import { useState, useEffect } from 'react'
import { fetchTasks } from '../../api/api.js'

import AddNewTask from '../../components/AddNewTask/AddNewTask.jsx'
import TasksFilter from '../../components/TasksFilter/TasksFilter.jsx'
import TasksList from '../../components/TaskList/TaskList.jsx'
import Error from '../../components/Error/Error.jsx'
import styles from './TodoListPage.module.scss'

const TODO_FILTER_KEYS = ['all', 'inWork', 'completed']

export default function TodoListPage() {
  const [tasks, setTasks] = useState({ data: [], info: {}, meta: {} })
  const [typeOfTasks, setTypeOfTasks] = useState(TODO_FILTER_KEYS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  async function fetchTaskList(typeOfTasks) {
    try {
      setIsLoading(true)
      const result = await fetchTasks(typeOfTasks)
      setTasks(result)
    } catch (error) {
      setError('Не удалось загрузить данные!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTaskList(typeOfTasks)
  }, [typeOfTasks])

  function handleTaskCreated() {
    fetchTaskList(typeOfTasks)
  }

  return (
    <div className={styles.todoListPage}>
      <Error error={error} setError={() => setError(null)} />
      <AddNewTask handleTaskCreated={handleTaskCreated} setError={setError} />
      <TasksFilter
        tasks={tasks}
        typeOfTasks={typeOfTasks}
        selectedTasks={TODO_FILTER_KEYS}
        setTypeOfTasks={setTypeOfTasks}
      />
      <TasksList
        tasks={tasks}
        isLoading={isLoading}
        setError={setError}
        fetchTaskList={() => fetchTaskList(typeOfTasks)}
      />
    </div>
  )
}
