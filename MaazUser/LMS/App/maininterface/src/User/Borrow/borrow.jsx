import React, { useEffect, useState } from "react";
import "./borrow.css";
import { useLocation } from "react-router-dom";

function BorrowHistory() {
  const location = useLocation();
  const data = location.state; // Assuming data contains { UserID: <userID> }
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrow history when component loads
  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const response = await fetch(`/api/borrowhistory/${data.userID}`);
        const result = await response.json();

        if (result.success) {
          setBorrowHistory(result.data);
        } else {
          console.error("Failed to fetch borrow history:", result.message);
        }
      } catch (error) {
        console.error("Error fetching borrow history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowHistory();
  }, [data.UserID]);

  return (
    <div className="borrow-history-page">
      <h1>Borrow History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : borrowHistory.length > 0 ? (
        <div className="borrow-history-table-container">
          <table className="borrow-history-table">
            <thead>
              <tr>
                <th>Borrow ID</th>
                <th>Book ID</th>
                <th>Borrowed By</th>
                <th>Approved By</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowHistory.map((record) => (
                <tr key={record.borrowID}>
                  <td>{record.borrowID}</td>
                  <td>{record.Book_id}</td>
                  <td>{record.Borrowed_by}</td>
                  <td>{record.Approved_by || "Pending"}</td>
                  <td>{new Date(record.BorrowDate).toLocaleDateString()}</td>
                  <td>{new Date(record.ReturnDate).toLocaleDateString()}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No borrow history found for this user.</p>
      )}
    </div>
  );
}

export default BorrowHistory;
