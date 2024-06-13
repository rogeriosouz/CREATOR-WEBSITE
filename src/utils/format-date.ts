export function formatDate(dateString: Date) {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('PT-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}
