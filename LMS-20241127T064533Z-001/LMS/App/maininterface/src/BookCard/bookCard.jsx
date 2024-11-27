import "./bookCard.css";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const navigate = useNavigate();
  function borrowBook() {
    if (props.logged) {
      navigate("/borrowform");
    }
  }
  return (
    <div className="book-card">
      <div className="book-info">
        <h2 className="book-title">{props.title}</h2>
        <p className="book-author">Author: {props.author}</p>
        <p className="book-publisher">Publisher: {props.publisher}</p>
        <p className="book-isbn">Genre: {props.genre}</p>
        <p className="book-isbn">ISBN: {props.isbn}</p>
      </div>
      <button
        className="borrow-button"
        onClick={borrowBook}
        disabled={props.count <= 0 ? true : false}
      >
        {props.count <= 0 ? "Not Available" : "Borrow"}{" "}
      </button>
    </div>
  );
}

export default BookCard;
