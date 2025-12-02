import { useState, useEffect } from 'react'
import { fetchTasks, updateTasks, createTask, deleteTask } from './http'
import Header from './components/Header'
import TaskList from './components/TaskList'
import styles from './App.module.scss'

const SELECTED_TASKS = ['all', 'inWork', 'completed']

function App() {
  const [allTasks, setAllTasks] = useState({ data: [], info: {}, meta: {} })
  const [typeOfTasks, setTypeOfTasks] = useState(SELECTED_TASKS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchTaskList() {
      try {
        setIsLoading(true)
        const result = await fetchTasks(typeOfTasks)
        setAllTasks(result)
      } catch (error) {
        setError({ message: 'Fail to load data!' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTaskList()
  }, [typeOfTasks])

  async function handleAddTask(title) {
    try {
      const newTask = await createTask(title)
      setAllTasks((prevTasks) => ({
        ...prevTasks,
        data:
          typeOfTasks !== SELECTED_TASKS[2]
            ? [...prevTasks.data, newTask]
            : prevTasks.data,
        info: {
          all: prevTasks.info.all + 1,
          completed: prevTasks.info.completed + (newTask.isDone ? 1 : 0),
          inWork: prevTasks.info.inWork + (!newTask.isDone ? 1 : 0),
        },
        meta: prevTasks.meta,
      }))
    } catch (error) {
      setError({ message: 'Failed to add task!' })
    }
  }

  async function handleTaskIsDoneSwitcher(taskId) {
    try {
      const currentTask = allTasks.data.find((elem) => elem.id === taskId)
      if (!currentTask) return

      const isDonePrev = currentTask.isDone
      const updatedIsDone = !currentTask.isDone

      await updateTasks(taskId, updatedIsDone, currentTask.title)

      setAllTasks((prevTasks) => ({
        ...prevTasks,
        data: prevTasks.data.map((elem) =>
          elem.id === taskId ? { ...elem, isDone: updatedIsDone } : elem,
        ),
        info: {
          all: prevTasks.info.all,
          completed:
            prevTasks.info.completed +
            (updatedIsDone ? 1 : 0) -
            (isDonePrev ? 1 : 0),
          inWork:
            prevTasks.info.inWork +
            (!updatedIsDone ? 1 : 0) -
            (!isDonePrev ? 1 : 0),
        },
        meta: prevTasks.meta,
      }))
    } catch (error) {
      setError({ message: 'Failed change task progress!' })
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId)

      setAllTasks((prevTasks) => {
        const deletedTask = prevTasks.data.find((elem) => elem.id === taskId)
        if (!deletedTask) return prevTasks

        return {
          ...prevTasks,
          data: prevTasks.data.filter((elem) => elem.id !== taskId),
          info: {
            all: prevTasks.info.all - 1,
            completed: prevTasks.info.completed - (deletedTask.isDone ? 1 : 0),
            inWork: prevTasks.info.inWork - (!deletedTask.isDone ? 1 : 0),
          },
          meta: prevTasks.meta,
        }
      })
    } catch (error) {
      setError({ message: 'Failed to delete task!' })
    }
  }

  async function handleUpdateTaskTitle(taskId, newTitle) {
    try {
      const currentTask = allTasks.data.find((elem) => elem.id === taskId)
      if (!currentTask) return

      await updateTasks(taskId, currentTask.isDone, newTitle)

      setAllTasks((prevTasks) => ({
        ...prevTasks,
        data: prevTasks.data.map((elem) =>
          elem.id === taskId ? { ...elem, title: newTitle } : elem,
        ),
        info: prevTasks.info,
        meta: prevTasks.meta,
      }))
    } catch (error) {
      setError({ message: 'Failed update task title!' })
    }
  }

  return (
    <div className={styles.app}>
      <Header addTask={handleAddTask} error={error} setError={setError} />
      <TaskList
        allTasks={allTasks}
        typeOfTasks={typeOfTasks}
        setTypeOfTasks={setTypeOfTasks}
        isLoading={isLoading}
        error={error}
        setError={setError}
        isDoneSwitcher={handleTaskIsDoneSwitcher}
        deleteTask={handleDeleteTask}
        updateTaskTitle={handleUpdateTaskTitle}
        selectedTasks={SELECTED_TASKS}
      />
    </div>
  )
}

export default App
