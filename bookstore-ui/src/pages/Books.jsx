import React, { useState, useEffect } from 'react'
import axois from "axios"
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axois.get("http://localhost:8000/books");
        console.log(res);
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllBooks()
  }, [])

  return (
    <>
<Navbar/>
    <div>
      <h1 className='text-center mt-3 text-secondary'>Online Book Store</h1>
      <div className="container">
      <div className="row d-flex justify-content-center gy-3">
        {
          books.map((book) => (
            <div key={book.id} className="col-6 col-lg-3 col-md-4 book">
              <div className="card">
              <img src={book.cover} className="card-img" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">Author: {book.description}</h5>
                <p className="card-text">Price: {book.price}</p>
                <a href="#" className="btn btn-primary">Buy Now</a>
              </div>
            </div>
            </div>
          ))
        }
      </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center gy-3">
          <div className="col-6 col-lg-3 col-md-4">
            <div className="card">
              <img src="./images/logo-bookstore.png" className="card-img" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Author:Some quick</p>
                <a href="#" className="btn btn-primary">Buy Now</a>
              </div>
            </div>
          </div>
      </div>
      </div>

      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
    </>
  )
}

export default Books
