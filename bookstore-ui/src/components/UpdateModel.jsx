import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";
import axios from 'axios';
function UpdateModel({ show, closeModal, bookEdit,fetchAllBooks }) {
    const id = bookEdit
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
        price: '',
        author: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        getSingleBook()
    }, [])

    const getSingleBook = () => {
        console.log(bookEdit)
        axios.get("http://localhost:8000/book/" + id).then((response) => {
            const [data] = response.data
            setBook(data)

        }).catch((err) => console.log(err));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({ ...prevState, [name]: value }))
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8000/book/" + id, book);
            fetchAllBooks()
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }
    if (!show) return null;
    return ReactDOM.createPortal(
        <div className='modal'>
            <div className="overlay" onClick={closeModal}></div>
            <div className="content">
                <h2 className='text-center'>Edit Book</h2>
                <form action="">
                    <div className="row">
                        <div className="col-12 col-md-6 g-3">
                            <input type='text' className='form-control' value={book.title} name='title' onChange={handleChange} placeholder='Title' />
                        </div>
                        <div className="col-12 col-md-6 g-3">
                            <input type='text' className='form-control' value={book.author} name='author' onChange={handleChange} placeholder='Author' />
                        </div>
                        <div className="col-12 col-md-6 g-3">
                            <input type='number' className='form-control' value={book.price} name='price' onChange={handleChange} placeholder='Price' />
                        </div>
                        <div className="col-12 col-md-6 g-3">
                            <input type='text' className='form-control' value={book.cover} name='cover' onChange={handleChange} placeholder='Cover' />
                        </div>
                        <div className="col-12 col-md-12 g-3">
                            <textarea type='text' className='form-control' value={book.description} name='description' onChange={handleChange} placeholder='Description' />
                        </div>

                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary float-right my-3' onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("portal-root")
    )
}

export default UpdateModel
