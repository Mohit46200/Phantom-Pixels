import slietLogo from "../photos/logo.webp"

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "students", label: "Students", icon: "🎓" },
  { key: "rooms", label: "Room Allocation", icon: "🛏️" },
  { key: "complaints", label: "Complaints", icon: "🛠️" },
  { key: "mess", label: "Mess Menu", icon: "🍽️" },
  { key: "announcements", label: "Announcements", icon: "📢" },
]

function Sidebar({ current, onNavigate, onLogout, isOpen }) {
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="brand">
        <img className="brand-logo" src={slietLogo} alt="SLIET Longowal logo" width="64" height="64" decoding="async" />
        <div>
          <h2>SLIET</h2>
          <span>Hostel Management</span>
        </div>
      </div>

      <nav className="nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={current === item.key ? "nav-link active" : "nav-link"}
            onClick={() => onNavigate(item.key)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button className="nav-link logout" onClick={onLogout}>
        <span className="nav-icon">🚪</span>
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
