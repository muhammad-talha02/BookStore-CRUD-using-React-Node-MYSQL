import React from 'react'
import ReactDOM from "react-dom";
function Modal({ show, closeModal, bookDetail }) {
    const [book] = bookDetail
    console.log(bookDetail);
    if(!show) return null;
    return ReactDOM.createPortal(
            <div className='modal'>
                <div className="overlay" onClick={closeModal}></div>
                <div className="content">
                    <h2>Title: {book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>Price: {book.price}</p>
                    <p>Desccription: {book.description}</p>
                    <button className='btn btn-primary' onClick={closeModal}>Close</button>
                </div>
            </div>,
                document.getElementById("portal-root")
    )
}

export default Modal
