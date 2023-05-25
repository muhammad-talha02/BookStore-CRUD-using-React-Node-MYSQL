import React, { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import UpdateModel from '../components/UpdateModel';
function Books() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [bookDetail, setBookDetail] = useState([]);
  const [bookEdit, setBookEdit] = useState(null)

  useEffect(() => {

    fetchAllBooks()
  }, [])

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/books");
      console.log(res);
      setBooks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {

      await axios.delete("http://localhost:8000/book/" + id);
      console.log("Deete")
      fetchAllBooks()
      // window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (id) => {
    axios.get("http://localhost:8000/book/" + id).then((response) => {
      setBookDetail(response.data)

      setShow(true);
    }).catch((err) => console.log(err));

  }
  const handleUpdate = (id) => {
    setBookEdit(id)
    setShowUpdate(true)

  }
  return (
    <>
      <Navbar />
      <div>
        <h1 className='text-center my-3 text-secondary'>Online Book Store</h1>
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
                      <a href="#" className="btn btn-secondary" onClick={() => handleView(book.id)}>View</a>
                      <a href="#" className="btn btn-success" onClick={() => handleUpdate(book.id)}>Update</a>
                      <a href="#" className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {show && <Modal show={show} bookDetail={bookDetail} closeModal={() => setShow(false)} />}
      {showUpdate && <UpdateModel fetchAllBooks={fetchAllBooks} show={showUpdate} bookEdit={bookEdit} closeModal={() => setShowUpdate(false)} />}
    </>
  )
}

export default Books
