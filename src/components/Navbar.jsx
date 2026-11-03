
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-logo">SoundSizer</h1>

      <nav className="navbar-links">
        <a href="/">Home</a>
        <a href="/create">Create Post</a>
      </nav>
    </header>
  )
}

export default Navbar
