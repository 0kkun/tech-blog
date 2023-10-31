export const logger = (title: string, message: string, ...subMessages: any[]) => {
  const black = '\u001b[30m'
  const red = '\u001b[31m'
  const green = '\u001b[32m'
  const yellow = '\u001b[33m'
  const blue = '\u001b[34m'

  if (import.meta.env.VITE_DEBUG_MODE == 'true') {
    const titleText = '[' + title + '] '
    if (title === 'interceptor') {
      console.log(green + titleText + message, ...subMessages)
    } else if (title === 'guard') {
      console.log(yellow + titleText + message, ...subMessages)
    } else {
      console.log(black + titleText + message, ...subMessages)
    }
  }
}
