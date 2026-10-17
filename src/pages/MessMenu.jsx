import { useState } from "react"
import { mealTimings } from "../data/mockData"
import { getTodayName } from "../utils"

function MessMenu({ menu, setMenu }) {
  const [editingDay, setEditingDay] = useState(null)
  const [editForm, setEditForm] = useState({})
  const today = getTodayName()

  function startEdit(row) {
    setEditingDay(row.day)
    setEditForm(row)
  }

  function handleChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  function saveEdit() {
    setMenu(menu.map((row) => (row.day === editingDay ? editForm : row)))
    setEditingDay(null)
  }

  return (
    <div>
      <div className="timing-grid">
        {mealTimings.map((t) => (
          <div key={t.meal} className="timing-card">
            <span>{t.meal}</span>
            <strong>{t.time}</strong>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Weekly Menu</h3>
          <span className="muted small">Click "Edit" to change a day's menu</span>
        </div>
        <div className="table-wrap">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Snacks</th>
                <th>Dinner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {menu.map((row) =>
                editingDay === row.day ? (
                  <tr key={row.day} className="editing-row">
                    <td><strong>{row.day}</strong></td>
                    <td><input name="breakfast" value={editForm.breakfast} onChange={handleChange} /></td>
                    <td><input name="lunch" value={editForm.lunch} onChange={handleChange} /></td>
                    <td><input name="snacks" value={editForm.snacks} onChange={handleChange} /></td>
                    <td><input name="dinner" value={editForm.dinner} onChange={handleChange} /></td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-primary btn-sm" onClick={saveEdit}>Save</button>
                        <button className="btn btn-light btn-sm" onClick={() => setEditingDay(null)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={row.day} className={row.day === today ? "today-row" : ""}>
                    <td>
                      <strong>{row.day}</strong>
                      {row.day === today && <div><span className="badge badge-info">Today</span></div>}
                    </td>
                    <td>{row.breakfast}</td>
                    <td>{row.lunch}</td>
                    <td>{row.snacks}</td>
                    <td>{row.dinner}</td>
                    <td>
                      <button className="btn btn-light btn-sm" onClick={() => startEdit(row)}>Edit</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MessMenu
