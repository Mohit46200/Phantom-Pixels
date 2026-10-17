import { useState } from "react"
import { users } from "../data/mockData"
import slietLogo from "../photos/logo.png"
import slietCampus from "../photos/sliet.png"

function Login({ onLogin }) {
  const [loginType, setLoginType] = useState("warden")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function switchType(type) {
    setLoginType(type)
    setUsername("")
    setPassword("")
    setError("")
  }

  function fillDemoLogin() {
    setUsername(users[0].username)
    setPassword(users[0].password)
    setError("")
  }

  function handleSubmit(e) {
    e.preventDefault()

    const found = users.find((u) => u.username === username && u.password === password)
    if (found) {
      onLogin({ name: found.name, role: found.role })
    } else {
      setError("Wrong username or password. Try admin / Sliet@Admin#2026.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-side">
          <img className="login-campus" src={slietCampus} alt="SLIET Longowal campus" />
          <img className="brand-logo big" src={slietLogo} alt="SLIET Longowal logo" />
          <h1>SLIET Hostel</h1>
          <p>Manage students, rooms, complaints and the mess menu - all in one place.</p>
          <ul>
            <li>96 rooms across 3 floors</li>
            <li>Quick room allocation</li>
            <li>Track complaints till they are fixed</li>
          </ul>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>

          <div className="login-switch">
            <button type="button" className={loginType === "warden" ? "active" : ""} onClick={() => switchType("warden")}>
              Warden
            </button>
            <button type="button" className={loginType === "student" ? "active" : ""} onClick={() => switchType("student")}>
              Student
            </button>
          </div>

          {loginType === "warden" ? (
            <>
              {error && <div className="alert alert-error">{error}</div>}

              <label>
                Username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. admin" />
              </label>

              <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
              </label>

              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>

              <div className="demo-box">
                <strong>Demo login</strong>
                <span>Username: admin &nbsp;|&nbsp; Password: Sliet@Admin#2026</span>
                <button type="button" className="btn btn-light btn-sm demo-fill" onClick={fillDemoLogin}>
                  Fill demo login
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="muted student-note">
                Students do not need a password. Continue to request a hostel room or raise a complaint.
              </p>
              <button type="button" className="btn btn-primary btn-block" onClick={() => onLogin({ name: "Student", role: "Student" })}>
                Continue as Student
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
