import './card.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Card(props){
    const [isVisible, setISVisible] = useState(true)
    const additionalRef = useRef()
    const navigate = useNavigate()

    const admin = ()=>{
        navigate(0)
    }

    function addBook(){
        const additonalCopies = Number(additionalRef.current.value)
        fetch('/api/addBookCopies', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({BookID: props.id, copies: Number(props.copies), addtional: additonalCopies})
        }).then(response => response.json())
        .then(data => {
            if(data.result){
                alert(additonalCopies + ' copies of the book '+ props.title +' are added.')
                admin()

            }
        })
    }

    function rejectBook(){
        setISVisible(false)
    }

    return(
        <>
    {isVisible &&
    (<div className="card">
        <div className="card-info">
          <h2 className="card-title">{props.title}</h2>
          <p className="card-author">Author: {props.author}</p>
          <p className="card-publisher">Publisher: {props.publisher}</p>
          <p className="card-genre">Genre: {props.genre}</p>
          <p className="card-copies">Available Copies: {props.copies}</p>
          <p className="card-out">Out Copies: {props.out}</p>
        </div>
        <div className="card-actions">
            <input type="number" defaultValue={1} min={1} ref={additionalRef} />
            <button className="add-button" onClick={addBook}>Add</button>
            <button className='reject-button' onClick={rejectBook}>Reject</button>
        </div>

    </div>)}
    </>
      )
}

export default Card;