export async function fetchTasks(filter = 'all') {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)

  if (!response.ok) {
    throw new Error('Failed to fetch list of Tasks.')
  }

  return await response.json()
}

export async function updateTask(id, todoRequest) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todoRequest),
  })

  if (!response.ok) {
    throw new Error('Failed to update data!')
  }

  return await response.json()
}

export async function createTask(title) {
  const response = await fetch(`https://easydev.club/api/v1/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, isDone: false }),
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }
  return await response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete data!')
  }

  return response.ok
}
