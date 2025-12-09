export function validateTaskTitle(title) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return 'Введите задачу.'
  }

  if (trimmedTitle.length < 2) {
    return 'Введите более 2 символов без учета пробелов'
  }

  if (trimmedTitle.length > 64) {
    return 'Введите менее 64 символов без учета пробелов'
  }

  return null
}
