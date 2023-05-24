import React from 'react'

function Navbar() {
  return (
    <header className='bg-dark'>
     <nav className=" container navbar navbar-dark">
  <div className="container-fluid d-flex">
    <a className="navbar-brand" href="/">
    <img src="./images/logo-bookstore.png" alt="" /></a>
    <div className="navbar-collapse" id="">
      <ul className="navbar-nav ms-auto mr-5 mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Add New</a>
        </li>
      </ul>
    </div>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
  </div>
</nav> 
    </header>
  )
}

export default Navbar
