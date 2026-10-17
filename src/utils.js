export function getToday() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${month}-${day}`
}
export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}
export function toClassName(text) {
  return text.toLowerCase().replace(/\s+/g, "-")
}
export function getTodayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" })
}
