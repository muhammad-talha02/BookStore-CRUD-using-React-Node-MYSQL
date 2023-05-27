import React, { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import UpdateModel from '../components/UpdateModel';
import { Link } from 'react-router-dom';
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
            
              books.length > 0 ? books.map((book) => (
                <div key={book.id} className="col-6 col-lg-3 col-md-4 book">
                  <div className="card">
                    <img src={`http://localhost:8000/uploads/${book.file}`} className="card-img" alt={"book.title"} />
                    {console.log(`http://localhost:8000/uploads/${book.file}`)}
                    <div className="card-body">
                      <h5 className="card-title text-center">{book.title}</h5>
                      <h6 className="card-text">Author: {book.author}</h6>
                      <p className="card-text">Price: {book.price} $</p>
                      <a className="text-primary mx-2" onClick={() => handleView(book.id)}><i class="fa-solid fa-eye"></i></a>
                      <a className="text-success mx-2" onClick={() => handleUpdate(book.id)}><i class="fa-solid fa-pen-to-square"></i></a>
                      <a className="text-danger mx-2" onClick={() => handleDelete(book.id)}><i class="fa-sharp fa-solid fa-trash"></i></a>
                    </div>
                  </div>
                </div>
              )) : <>
              <h2 className='text-center'>Books Not Found:</h2>
              <Link className='text-center' to="/add">Add New Book</Link>
              </> 
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
