
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-logo">SoundSizer</h1>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  )
}

export default Navbar