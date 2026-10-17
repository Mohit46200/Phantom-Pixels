import { useState } from "react"
import { formatDate, toClassName } from "../utils"

const statuses = ["All", "Pending", "In Progress", "Resolved"]

function Complaints({ complaints, setComplaints }) {
  const [filter, setFilter] = useState("All")

  function changeStatus(id, newStatus) {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
  }

  function handleDelete(id) {
    if (window.confirm("Delete this complaint?")) {
      setComplaints(complaints.filter((c) => c.id !== id))
    }
  }

  function countByStatus(status) {
    if (status === "All") return complaints.length
    return complaints.filter((c) => c.status === status).length
  }

  const shown = complaints
    .filter((c) => filter === "All" || c.status === filter)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <div className="toolbar">
        <div className="filter-tabs no-margin">
          {statuses.map((s) => (
            <button key={s} className={filter === s ? "tab active" : "tab"} onClick={() => setFilter(s)}>
              {s} <span className="tab-count">{countByStatus(s)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="complaint-list">
        {shown.map((c) => (
          <div key={c.id} className={"complaint-card border-" + toClassName(c.status)}>
            <div className="complaint-top">
              <div>
                <h4>{c.title}</h4>
                <span className="muted small">
                  {c.studentName} · Room {c.room} · {formatDate(c.date)}
                </span>
              </div>
              <div className="complaint-badges">
                <span className="badge badge-neutral">{c.category}</span>
                <span className={"badge priority-" + toClassName(c.priority)}>{c.priority}</span>
              </div>
            </div>
            {c.description && <p>{c.description}</p>}
            <div className="complaint-bottom">
              <label className="inline-label">
                Status:
                <select
                  className={"status-select status-" + toClassName(c.status)}
                  value={c.status}
                  onChange={(e) => changeStatus(c.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </label>
              <button className="btn btn-danger-light btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </div>
        ))}
        {shown.length === 0 && <div className="card empty">No complaints in this list.</div>}
      </div>
    </div>
  )
}

export default Complaints
