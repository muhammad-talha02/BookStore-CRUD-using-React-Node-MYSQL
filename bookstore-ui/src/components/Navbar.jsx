import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <header className='bg-secondary sticky-top'>
      <nav className="container navbar navbar-dark">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            <img src="./images/logo-bookstore.png" alt="" /></Link>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          <div className="" id="">
            <ul className="navbar-nav ms-auto mr-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn btn-primary" aria-current="page" to="/add">Add New</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
