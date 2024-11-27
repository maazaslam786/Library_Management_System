import './adminint.css'
import Header from './header/adminheader.jsx';
import Footer from './footer/adminfooter.jsx';
import { useEffect, useState } from 'react';
import Card from './Card/card.jsx';


function Admin(){
    const [books, setBooks] = useState([])

    useEffect(()=>{
        fetch('/api/getReqBooks',{
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        }).then(response => response.json())
        .then(data =>{
            console.log(data.data)
            setBooks(data.data)
        })
    },[])

    return (<>
    <Header/>
    <div className="add-empty"><h1>Add Books</h1></div>
    {books.map(book => (<Card key={book.Book_id} id={book.Book_id} title={book.Title} genre={book.Genre} author={book.Author} publisher={book.Publisher} copies={book.Books_count} out={ book.Outgoing_copies} />))}
    <div style={{height: '100px'}} className="add-empty"></div>
    <Footer/>
        </>)
}

export default Admin
