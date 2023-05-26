import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadFiles from '../components/UploadFiles';

function Add() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
        price: '',
        author: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({ ...prevState, [name]: value }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <h1 className='text-secondary my-3 text-center'>Add New Book</h1>
            <div className="container">

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
                <UploadFiles/>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-secondary float-right my-3' onClick={() => navigate("/")}>Go Back</button>
                        <button className='btn btn-primary float-right my-3' onClick={handleClick}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add
