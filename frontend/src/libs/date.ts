

export const formatDateTime = (dateTimeStr: string) => {
  const dateTime = new Date(dateTimeStr)
  
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1 // 月は0から始まるため+1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const amPm = hour >= 12 ? "PM" : "AM"

  const formattedDateTime = `${year}/${month}/${day} ${amPm}${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  
  return formattedDateTime
}