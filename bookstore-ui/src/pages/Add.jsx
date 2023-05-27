import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadFiles from '../components/UploadFiles';

function Add() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: '',
        author: '',
    });
    const [file, setFile] = useState({})
    const navigate = useNavigate()
    console.log(book)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({ ...prevState, [name]: value }))
    }
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }



    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", book.title);
        formData.append("description",  book.description);
        formData.append("file", file);
        formData.append("price", book.price);
        formData.append("author", book.author);
        console.log(formData);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        try {
           const res =  await axios.post("http://localhost:8000/books", formData);
            console.log(res)
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
                            <input type='file' className='form-control' name='file' onChange={handleFileChange} placeholder='Cover' />
                        </div>
                        <div className="col-12 col-md-12 g-3">
                            <textarea type='text' className='form-control' value={book.description} name='description' onChange={handleChange} placeholder='Description' />
                        </div>

                    </div>
                    {/* <UploadFiles/> */}
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
