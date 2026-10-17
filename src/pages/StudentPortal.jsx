import { useState } from "react"
import { formatDate, getToday, toClassName } from "../utils"
import slietLogo from "../photos/logo.png"

function StudentPortal({ bookings, setBookings, complaints, setComplaints, announcements, onLogout }) {
  const [tab, setTab] = useState("booking")
  const [message, setMessage] = useState("")

  const [name, setName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [branch, setBranch] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [address, setAddress] = useState("")

  const [complaintName, setComplaintName] = useState("")
  const [room, setRoom] = useState("")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Electrical")
  const [description, setDescription] = useState("")

  function changeTab(newTab) {
    setTab(newTab)
    setMessage("")
  }

  function handleBooking(e) {
    e.preventDefault()
    const newBooking = {
      id: Date.now(),
      name: name,
      regNo: regNo.toUpperCase(),
      branch: branch,
      fatherName: fatherName,
      address: address,
      date: getToday(),
    }
    setBookings([...bookings, newBooking])
    setName("")
    setRegNo("")
    setBranch("")
    setFatherName("")
    setAddress("")
    setMessage("Your room request has been sent to the warden.")
  }

  function handleComplaint(e) {
    e.preventDefault()
    const newComplaint = {
      id: Date.now(),
      studentName: complaintName,
      room: room,
      title: title,
      category: category,
      priority: "Medium",
      description: description,
      status: "Pending",
      date: getToday(),
    }
    setComplaints([newComplaint, ...complaints])
    setComplaintName("")
    setRoom("")
    setTitle("")
    setDescription("")
    setMessage("Your complaint has been sent to the warden.")
  }

  const notices = [...announcements].sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date))

  return (
    <div className="student-page">
      <header className="student-header">
        <div className="brand">
          <img className="brand-logo" src={slietLogo} alt="SLIET Longowal logo" />
          <div>
            <h2>SLIET Hostel</h2>
            <span>Student Section</span>
          </div>
        </div>
        <button className="btn btn-light btn-sm" onClick={onLogout}>Back to Login</button>
      </header>

      <main className="student-content">
        <div className="filter-tabs">
          <button className={tab === "booking" ? "tab active" : "tab"} onClick={() => changeTab("booking")}>
            🛏️ Room Request
          </button>
          <button className={tab === "complaint" ? "tab active" : "tab"} onClick={() => changeTab("complaint")}>
            🛠️ Raise Complaint
          </button>
          <button className={tab === "announcements" ? "tab active" : "tab"} onClick={() => changeTab("announcements")}>
            📢 Announcements
          </button>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        {tab === "announcements" && (
          <div>
            {notices.map((a) => (
              <div key={a.id} className={a.pinned ? "notice pinned" : "notice"}>
                <div className="notice-top">
                  <span className={"badge cat-" + toClassName(a.category)}>{a.category}</span>
                  {a.pinned && <span className="pin-label">📌 Pinned</span>}
                </div>
                <h4>{a.title}</h4>
                <p>{a.message}</p>
                <div className="notice-bottom">
                  <span className="muted small">By {a.author} · {formatDate(a.date)}</span>
                </div>
              </div>
            ))}
            {notices.length === 0 && <div className="card empty">No announcements right now.</div>}
          </div>
        )}

        {tab === "booking" && (
          <div className="card form-card">
            <div className="card-header">
              <h3>Apply for a Hostel Room</h3>
            </div>
            <form onSubmit={handleBooking} className="stack-form">
              <label>
                Full Name
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mohit Kumar Verma" required />
              </label>
              <label>
                Registration Number
                <input value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="e.g. 254054004" required />
              </label>
              <label>
                Branch
                <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
                  <option value="">-- Select branch --</option>
                  <option>Electrical</option>
                  <option>Mechanical</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                </select>
              </label>
              <label>
                Father's Name
                <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder="e.g. Ramesh Sharma" required />
              </label>
              <label>
                Address
                <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, street, city, state" required></textarea>
              </label>
              <button type="submit" className="btn btn-primary">Send Request</button>
            </form>
          </div>
        )}

        {tab === "complaint" && (
          <div className="card form-card">
            <div className="card-header">
              <h3>Raise a Complaint</h3>
            </div>
            <form onSubmit={handleComplaint} className="stack-form">
              <label>
                Your Name
                <input value={complaintName} onChange={(e) => setComplaintName(e.target.value)} placeholder="e.g. Mohit Kumar Verma" required />
              </label>
              <label>
                Room Number
                <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="e.g. 105" required />
              </label>
              <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fan not working" required />
              </label>
              <label>
                Category
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Furniture</option>
                  <option>Cleaning</option>
                  <option>Internet</option>
                  <option>Mess</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Description
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the problem..."></textarea>
              </label>
              <button type="submit" className="btn btn-primary">Submit Complaint</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default StudentPortal
