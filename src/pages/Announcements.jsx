import { useState } from "react"
import { formatDate, getToday, toClassName } from "../utils"

const categories = ["General", "Fees", "Maintenance", "Event", "Rules"]

function Announcements({ announcements, setAnnouncements, user }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("General")
  const [pinned, setPinned] = useState(false)
  const [filter, setFilter] = useState("All")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !message.trim()) {
      setError("Title and message cannot be empty.")
      return
    }
    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      category,
      pinned,
      date: getToday(),
      author: user.name,
    }
    setAnnouncements([newNotice, ...announcements])
    setTitle("")
    setMessage("")
    setCategory("General")
    setPinned(false)
    setError("")
  }

  function togglePin(id) {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a)))
  }

  function handleDelete(id) {
    if (window.confirm("Delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id))
    }
  }

  const shown = announcements
    .filter((a) => filter === "All" || a.category === filter)
    .sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date))

  return (
    <div className="announce-layout">
      <div className="card form-card announce-form">
        <div className="card-header">
          <h3>Post an Announcement</h3>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="stack-form">
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Room inspection on Friday" />
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Message
            <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write the notice here..."></textarea>
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
            Pin to top
          </label>
          <button type="submit" className="btn btn-primary">Post Announcement</button>
        </form>
      </div>

      <div>
        <div className="filter-tabs">
          {["All", ...categories].map((c) => (
            <button key={c} className={filter === c ? "tab active" : "tab"} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        {shown.map((a) => (
          <div key={a.id} className={a.pinned ? "notice pinned" : "notice"}>
            <div className="notice-top">
              <span className={"badge cat-" + toClassName(a.category)}>{a.category}</span>
              {a.pinned && <span className="pin-label">📌 Pinned</span>}
            </div>
            <h4>{a.title}</h4>
            <p>{a.message}</p>
            <div className="notice-bottom">
              <span className="muted small">By {a.author} · {formatDate(a.date)}</span>
              <div className="actions">
                <button className="btn btn-light btn-sm" onClick={() => togglePin(a.id)}>
                  {a.pinned ? "Unpin" : "Pin"}
                </button>
                <button className="btn btn-danger-light btn-sm" onClick={() => handleDelete(a.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {shown.length === 0 && <div className="card empty">No announcements in this category.</div>}
      </div>
    </div>
  )
}

export default Announcements
