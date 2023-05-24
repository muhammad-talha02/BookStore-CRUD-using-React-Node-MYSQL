import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Add() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
        price: ''
    });
const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({ ...prevState, [name]: value }))
    }
const handleClick = async (e) =>{
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
            <h1>Add New Book</h1>
            <div>
                <form action="">
                    <input type='text' value={book.title} name='title' onChange={handleChange} placeholder='title' />
                    <input type='text' value={book.description} name='description' onChange={handleChange} placeholder='description' />
                    <input type='number' value={book.price} name='price' onChange={handleChange} placeholder='price' />
                    <input type='text' value={book.cover} name='cover' onChange={handleChange} placeholder='cover' />
                    <button onClick={handleClick}>Add</button>
                </form>
            </div>
        </>
    )
}

export default Add
