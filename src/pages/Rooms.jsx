import { useState } from "react"
import { formatDate } from "../utils"

const ROOMS_PER_PAGE = 16

function Rooms({ rooms, students, setStudents, bookings, setBookings }) {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [floor, setFloor] = useState(1)
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState("")
  const [chosenRooms, setChosenRooms] = useState({})

  function getOccupants(roomNumber) {
    return students.filter((s) => s.room === roomNumber)
  }

  function showMessage(text) {
    setMessage(text)
    setTimeout(() => setMessage(""), 3000)
  }

  const unallocatedStudents = students.filter((s) => !s.room)
  const availableRooms = rooms.filter((r) => getOccupants(r.number).length < r.capacity)

  const floorRooms = rooms.filter((r) => r.floor === floor)
  const totalPages = Math.ceil(floorRooms.length / ROOMS_PER_PAGE)
  const shownRooms = floorRooms.slice((page - 1) * ROOMS_PER_PAGE, page * ROOMS_PER_PAGE)

  function changeFloor(newFloor) {
    setFloor(newFloor)
    setPage(1)
  }

  function handleAllocate(e) {
    e.preventDefault()
    if (!selectedStudent || !selectedRoom) {
      showMessage("Please select both a student and a room.")
      return
    }
    const student = students.find((s) => s.id === Number(selectedStudent))
    setStudents(students.map((s) => (s.id === student.id ? { ...s, room: selectedRoom } : s)))
    showMessage(`${student.name} has been allotted room ${selectedRoom}.`)
    setSelectedStudent("")
    setSelectedRoom("")
  }

  function handleVacate(student) {
    if (window.confirm(`Remove ${student.name} from room ${student.room}?`)) {
      setStudents(students.map((s) => (s.id === student.id ? { ...s, room: "" } : s)))
    }
  }

  function approveBooking(booking) {
    const room = chosenRooms[booking.id]
    const newStudent = {
      id: Date.now(),
      name: booking.name,
      rollNo: booking.regNo,
      course: booking.branch,
      year: "1st",
      phone: "",
      email: "",
      fatherName: booking.fatherName,
      address: booking.address,
      room: room,
      feeStatus: "Pending",
    }
    setStudents([...students, newStudent])
    setBookings(bookings.filter((b) => b.id !== booking.id))
    showMessage(`${booking.name} has been allotted room ${room}.`)
  }

  function rejectBooking(booking) {
    setBookings(bookings.filter((b) => b.id !== booking.id))
  }

  return (
    <div>
      {message && <div className="alert alert-success">{message}</div>}

      {bookings.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3>Room Requests from Students</h3>
            <span className="badge badge-info">{bookings.length} new</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reg. No</th>
                  <th>Branch</th>
                  <th>Father's Name</th>
                  <th>Address</th>
                  <th>Give Room</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong>{b.name}</strong>
                      <div className="muted small">{formatDate(b.date)}</div>
                    </td>
                    <td>{b.regNo}</td>
                    <td>{b.branch}</td>
                    <td>{b.fatherName}</td>
                    <td className="address-cell">{b.address}</td>
                    <td>
                      <select
                        className="room-select"
                        value={chosenRooms[b.id] || ""}
                        onChange={(e) => setChosenRooms({ ...chosenRooms, [b.id]: e.target.value })}
                      >
                        <option value="">Select</option>
                        {availableRooms.map((r) => (
                          <option key={r.number} value={r.number}>{r.number}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-primary btn-sm" disabled={!chosenRooms[b.id]} onClick={() => approveBooking(b)}>Approve</button>
                        <button className="btn btn-danger-light btn-sm" onClick={() => rejectBooking(b)}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid-2 allocate-grid">
        <div className="card">
          <div className="card-header">
            <h3>Allocate a Room</h3>
          </div>
          <form onSubmit={handleAllocate} className="stack-form">
            <label>
              Student (without room)
              <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                <option value="">-- Select student --</option>
                {unallocatedStudents.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>
                ))}
              </select>
            </label>
            <label>
              Available Room
              <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">-- Select room --</option>
                {availableRooms.map((r) => (
                  <option key={r.number} value={r.number}>
                    Room {r.number} · Floor {r.floor} · {r.capacity - getOccupants(r.number).length} bed(s) free
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary">Allocate</button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Hostel Summary</h3>
          </div>
          <div className="room-summary">
            <div><strong>{rooms.length}</strong><span>Total rooms</span></div>
            <div><strong>{availableRooms.length}</strong><span>With free beds</span></div>
            <div><strong>{rooms.length - availableRooms.length}</strong><span>Fully occupied</span></div>
          </div>
          <p className="muted small summary-note">3 floors · 32 rooms per floor · 3 beds per room</p>
        </div>
      </div>

      <div className="filter-tabs">
        {[1, 2, 3].map((f) => (
          <button key={f} className={floor === f ? "tab active" : "tab"} onClick={() => changeFloor(f)}>
            Floor {f}
          </button>
        ))}
      </div>

      <div className="room-grid">
        {shownRooms.map((room) => {
          const occupants = getOccupants(room.number)
          const isFull = occupants.length >= room.capacity
          return (
            <div key={room.number} className={isFull ? "room-card full" : "room-card"}>
              <div className="room-card-top">
                <div>
                  <h4>Room {room.number}</h4>
                  <span className="muted small">Floor {room.floor} · {room.capacity} beds</span>
                </div>
                <span className={isFull ? "badge badge-danger" : "badge badge-success"}>
                  {isFull ? "Full" : `${room.capacity - occupants.length} free`}
                </span>
              </div>

              <div className="beds">
                {Array.from({ length: room.capacity }).map((_, i) => (
                  <span key={i} className={i < occupants.length ? "bed taken" : "bed"}></span>
                ))}
              </div>

              <ul className="occupants">
                {occupants.map((s) => (
                  <li key={s.id}>
                    <span>{s.name}</span>
                    <button className="link-btn danger" onClick={() => handleVacate(s)}>Vacate</button>
                  </li>
                ))}
                {occupants.length === 0 && <li className="muted small">Empty room</li>}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="pagination">
        <button className="btn btn-light btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "page-btn active" : "page-btn"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="btn btn-light btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default Rooms
