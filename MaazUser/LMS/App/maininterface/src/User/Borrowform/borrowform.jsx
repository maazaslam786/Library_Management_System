import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./borrowform.css"; // Importing the signup CSS for styling

function BorrowForm() {
  const location = useLocation();
  const data = location.state; // Get the state data
  const { bookid, userID } = data; // Extract bookid and userID (staff name)

  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  const borrowDateRef = useRef();
  const returnDateRef = useRef();

  // Submit function to send data to the backend API
  const submit = (e) => {
    e.preventDefault();

    const borrowDate = borrowDateRef.current.value;
    const returnDate = returnDateRef.current.value;

    const formData = {
      bookid,
      userID,
      borrowDate,
      returnDate,
      // You can add additional fields if needed, like 'approvedBy' or 'status'
    };

    // Sending the form data to the backend API
    fetch("/api/borrowform", {
      // Make sure the URL is correct
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(`/success?id=${data.id}`);
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.log("Error making the request:", error);
      });
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="title">Borrow Form</div>
        <form onSubmit={submit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Book ID:</span>
              <input
                type="text"
                value={bookid}
                readOnly
                className="input-field"
              />
            </div>
            <div className="input-box">
              <span className="details">UserID:</span>
              <input
                type="text"
                value={userID}
                readOnly
                className="input-field"
              />
            </div>
            <div className="input-box">
              <span className="details">Borrow Date:</span>
              <input
                type="date"
                ref={borrowDateRef}
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Return Date:</span>
              <input
                type="date"
                ref={returnDateRef}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default BorrowForm;
