import { useState } from "react"

function Students({ students, setStudents }) {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function openEditForm(student) {
    setForm(student)
    setEditingId(student.id)
    setError("")
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim() || !form.rollNo.trim()) {
      setError("Name and registration number are required.")
      return
    }

    setStudents(students.map((s) => (s.id === editingId ? form : s)))
    closeForm()
  }

  function handleDelete(student) {
    if (window.confirm(`Remove ${student.name} from the hostel records?`)) {
      setStudents(students.filter((s) => s.id !== student.id))
    }
  }

  function toggleFee(student) {
    const newStatus = student.feeStatus === "Paid" ? "Pending" : "Paid"
    setStudents(students.map((s) => (s.id === student.id ? { ...s, feeStatus: newStatus } : s)))
  }

  const term = search.toLowerCase()
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(term) ||
      s.rollNo.toLowerCase().includes(term) ||
      s.course.toLowerCase().includes(term) ||
      s.room.toLowerCase().includes(term)
  )

  return (
    <div>
      <div className="toolbar">
        <input
          type="text"
          className="search"
          placeholder="Search by name, reg. no, branch or room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="card form-card">
          <div className="card-header">
            <h3>Edit Student</h3>
            <button className="link-btn" onClick={closeForm}>✕ Close</button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Full Name *
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Yadav" />
            </label>
            <label>
              Registration Number *
              <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="e.g. 254064001" />
            </label>
            <label>
              Branch
              <select name="course" value={form.course} onChange={handleChange}>
                <option>Electrical</option>
                <option>Mechanical</option>
                <option>Computer Science</option>
                <option>Electronics</option>
              </select>
            </label>
            <label>
              Year
              <select name="year" value={form.year} onChange={handleChange}>
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
                <option>4th</option>
              </select>
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit number" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@gmail.com" />
            </label>
            <label>
              Fee Status
              <select name="feeStatus" value={form.feeStatus} onChange={handleChange}>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </label>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-light" onClick={closeForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>All Students</h3>
          <span className="muted small">{filteredStudents.length} of {students.length} shown</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Reg. No</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Room</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="person">
                      <div className="avatar small">{s.name.charAt(0)}</div>
                      <div>
                        <strong>{s.name}</strong>
                        {s.email && <div className="muted small">{s.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td>{s.rollNo}</td>
                  <td>{s.course} <span className="muted small">({s.year})</span></td>
                  <td>{s.phone}</td>
                  <td>{s.room ? <span className="room-tag">{s.room}</span> : <span className="muted small">Not allotted</span>}</td>
                  <td>
                    <button
                      className={"badge badge-btn " + (s.feeStatus === "Paid" ? "badge-success" : "badge-danger")}
                      onClick={() => toggleFee(s)}
                      title="Click to change"
                    >
                      {s.feeStatus}
                    </button>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-light btn-sm" onClick={() => openEditForm(s)}>Edit</button>
                      <button className="btn btn-danger-light btn-sm" onClick={() => handleDelete(s)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr><td colSpan="7" className="empty">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Students
