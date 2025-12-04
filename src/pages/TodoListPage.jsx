import { useState, useEffect } from 'react'
import { fetchTasks, updateTasks, createTask, deleteTask } from '../api/api'

import AddNewTask from '../components/AddNewTask.jsx'
import TasksFilter from '../components/TasksFilter'
import TasksList from '../components/TaskList.jsx'
import styles from './TodoListPage.module.scss'

const SELECTED_TASKS = ['all', 'inWork', 'completed']

export default function TodoListPage() {
  const [allTasks, setAllTasks] = useState({ data: [], info: {}, meta: {} })
  const [typeOfTasks, setTypeOfTasks] = useState(SELECTED_TASKS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  async function fetchTaskList(currentTypeofTask) {
    try {
      setIsLoading(true)
      const result = await fetchTasks(currentTypeofTask)
      setAllTasks(result)
    } catch (error) {
      setError({ message: 'Fail to load data!' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTaskList(typeOfTasks)
  }, [typeOfTasks])

  async function handleAddTask(title) {
    try {
      await createTask(title)
      await fetchTaskList(typeOfTasks)
    } catch (error) {
      setError({ message: 'Failed to add task!' })
    }
  }

  async function handleTaskIsDoneSwitcher(taskId) {
    try {
      const currentTask = allTasks.data.find((elem) => elem.id === taskId)
      if (!currentTask) return

      const updatedIsDone = !currentTask.isDone
      await updateTasks(taskId, updatedIsDone, currentTask.title)
      await fetchTaskList(typeOfTasks)
    } catch (error) {
      setError({ message: 'Failed change task progress!' })
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId)
      await fetchTaskList(typeOfTasks)
    } catch (error) {
      setError({ message: 'Failed to delete task!' })
    }
  }

  async function handleUpdateTaskTitle(taskId, newTitle) {
    try {
      const currentTask = allTasks.data.find((elem) => elem.id === taskId)
      if (!currentTask) return

      await updateTasks(taskId, currentTask.isDone, newTitle)
      await fetchTaskList(typeOfTasks)
    } catch (error) {
      setError({ message: 'Failed update task title!' })
    }
  }

  return (
    <div className={styles.todoListPage}>
      <AddNewTask addTask={handleAddTask} />
      <TasksFilter
        allTasks={allTasks}
        typeOfTasks={typeOfTasks}
        selectedTasks={SELECTED_TASKS}
        setTypeOfTasks={setTypeOfTasks}
      />
      <TasksList
        allTasks={allTasks}
        isLoading={isLoading}
        error={error}
        setError={setError}
        isDoneSwitcher={handleTaskIsDoneSwitcher}
        deleteTask={handleDeleteTask}
        updateTaskTitle={handleUpdateTaskTitle}
      />
    </div>
  )
}
