import { formatDate, toClassName, getTodayName } from "../utils"

function Dashboard({ user, students, rooms, complaints, menu, announcements, onNavigate }) {
  const totalBeds = rooms.reduce((sum, room) => sum + room.capacity, 0)
  const occupiedBeds = students.filter((s) => s.room).length
  const occupancy = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0
  const openComplaints = complaints.filter((c) => c.status !== "Resolved").length
  const feePending = students.filter((s) => s.feeStatus === "Pending").length

  const floorStats = [1, 2, 3].map((floor) => {
    const floorRooms = rooms.filter((r) => r.floor === floor)
    const beds = floorRooms.reduce((sum, r) => sum + r.capacity, 0)
    const roomNumbers = floorRooms.map((r) => r.number)
    const filled = students.filter((s) => roomNumbers.includes(s.room)).length
    return { floor, beds, filled, percent: beds > 0 ? Math.round((filled / beds) * 100) : 0 }
  })

  const recentComplaints = [...complaints].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
  const latestNews = [...announcements]
    .sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date))
    .slice(0, 3)
  const todayMenu = menu.find((m) => m.day === getTodayName()) || menu[0]

  return (
    <div>
      <div className="welcome">
        <div>
          <h2>Hello, {user.name.split(" ")[0]} 👋</h2>
          <p>Here is what is happening in the hostel today.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("rooms")}>Allocate Room</button>
          <button className="btn btn-outline" onClick={() => onNavigate("announcements")}>New Notice</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon teal">🎓</div>
          <div>
            <span className="stat-label">Total Students</span>
            <strong className="stat-value">{students.length}</strong>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🛏️</div>
          <div>
            <span className="stat-label">Beds Occupied</span>
            <strong className="stat-value">{occupiedBeds} / {totalBeds}</strong>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">🛠️</div>
          <div>
            <span className="stat-label">Open Complaints</span>
            <strong className="stat-value">{openComplaints}</strong>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">💰</div>
          <div>
            <span className="stat-label">Fee Pending</span>
            <strong className="stat-value">{feePending}</strong>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Room Occupancy</h3>
            <span className="badge badge-info">{occupancy}% full</span>
          </div>
          {floorStats.map((f) => (
            <div key={f.floor} className="progress-row">
              <div className="progress-label">
                <span>Floor {f.floor}</span>
                <span className="muted">{f.filled} of {f.beds} beds</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: f.percent + "%" }}></div>
              </div>
            </div>
          ))}
          <p className="muted small">
            {totalBeds - occupiedBeds} beds available · {students.filter((s) => !s.room).length} students waiting for a room
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Today's Menu</h3>
            <span className="badge badge-neutral">{todayMenu.day}</span>
          </div>
          <ul className="menu-list">
            <li><span>Breakfast</span>{todayMenu.breakfast}</li>
            <li><span>Lunch</span>{todayMenu.lunch}</li>
            <li><span>Snacks</span>{todayMenu.snacks}</li>
            <li><span>Dinner</span>{todayMenu.dinner}</li>
          </ul>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Recent Complaints</h3>
            <button className="link-btn" onClick={() => onNavigate("complaints")}>View all →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Room</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentComplaints.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.title}</strong>
                      <div className="muted small">{c.studentName}</div>
                    </td>
                    <td><span className="room-tag">{c.room}</span></td>
                    <td><span className={"badge status-" + toClassName(c.status)}>{c.status}</span></td>
                  </tr>
                ))}
                {recentComplaints.length === 0 && (
                  <tr><td colSpan="3" className="empty">No complaints 🎉</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Latest Announcements</h3>
            <button className="link-btn" onClick={() => onNavigate("announcements")}>View all →</button>
          </div>
          {latestNews.map((a) => (
            <div key={a.id} className="mini-notice">
              <div className="mini-notice-top">
                <strong>{a.pinned && "📌 "}{a.title}</strong>
                <span className="muted small">{formatDate(a.date)}</span>
              </div>
              <p>{a.message}</p>
            </div>
          ))}
          {latestNews.length === 0 && <p className="empty">No announcements yet.</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
