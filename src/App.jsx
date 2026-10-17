import { useState } from "react"
import useLocalStorage from "./useLocalStorage"
import {initialStudents,initialRooms,initialComplaints,initialMenu,initialAnnouncements,initialBookings} from "./data/mockData"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Rooms from "./pages/Rooms"
import Complaints from "./pages/Complaints"
import MessMenu from "./pages/MessMenu"
import Announcements from "./pages/Announcements"
import StudentPortal from "./pages/StudentPortal"

const pageTitles = {
  dashboard: "Dashboard",
  students: "Student Details",
  rooms: "Room Allocation",
  complaints: "Complaints",
  mess: "Mess Menu",
  announcements: "Announcements",
}

function App() {
  const rooms = initialRooms
  const [user, setUser] = useLocalStorage("hms2_user", null)
  const [students, setStudents] = useLocalStorage("hms5_students", initialStudents)
  const [complaints, setComplaints] = useLocalStorage("hms2_complaints", initialComplaints)
  const [menu, setMenu] = useLocalStorage("hms2_menu", initialMenu)
  const [announcements, setAnnouncements] = useLocalStorage("hms2_announcements", initialAnnouncements)
  const [bookings, setBookings] = useLocalStorage("hms3_bookings", initialBookings)

  const [page, setPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) {
    return <Login onLogin={setUser} />
  }

  function handleLogout() {
    setUser(null)
    setPage("dashboard")
  }

  if (user.role === "Student") {
    return (
      <StudentPortal bookings={bookings}setBookings={setBookings}complaints={complaints}setComplaints={setComplaints}
        announcements={announcements}onLogout={handleLogout}
      />
    )
  }

  function goTo(pageName) {
    setPage(pageName)
    setSidebarOpen(false)
  }

  let content
  if (page === "dashboard") {
    content = (
      <Dashboard
        user={user}
        students={students}
        rooms={rooms}
        complaints={complaints}
        menu={menu}
        announcements={announcements}
        onNavigate={goTo}
      />
    )
  } else if (page === "students") {
    content = <Students students={students} setStudents={setStudents} />
  } else if (page === "rooms") {
    content = <Rooms rooms={rooms} students={students} setStudents={setStudents} bookings={bookings} setBookings={setBookings} />
  } else if (page === "complaints") {
    content = <Complaints complaints={complaints} setComplaints={setComplaints} />
  } else if (page === "mess") {
    content = <MessMenu menu={menu} setMenu={setMenu} />
  } else if (page === "announcements") {
    content = <Announcements announcements={announcements} setAnnouncements={setAnnouncements} user={user} />
  }

  return (
    <div className="app">
      <Sidebar current={page} onNavigate={goTo} onLogout={handleLogout} isOpen={sidebarOpen} />
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            ☰
          </button>
          <h1 className="page-title">{pageTitles[page]}</h1>
          <div className="topbar-right">
            <div className="user-chip">
              <div className="avatar">{user.name.charAt(0)}</div>
              <div className="user-info">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">{content}</main>
      </div>
    </div>
  )
}

export default App
