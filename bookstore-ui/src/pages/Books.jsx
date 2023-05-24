import React , { useState, useEffect} from 'react'
import axois from "axios"
import { Link } from 'react-router-dom';
function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
    const fetchAllBooks = async ()=>{
        try {
            const res =await axois.get("http://localhost:8000/books");
            console.log(res);
            setBooks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    fetchAllBooks()
    }, [])
    
  return (
    <div>
      <h1 className='text-center'>Earn Book Shop</h1> 
      <p>ahhah</p>
      <div className="books">
        {
            books.map((book)=>(
                <div key={book.id} className="book">
                {book.cover && <img src={book.cover} alt=""/>}
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <span>{book.price}</span>
                </div>
            ))
        }
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  )
}

export default Books
