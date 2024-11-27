import { useState, useEffect } from "react";
import "./bookIssueApproval.css";
import TableData from "../TableData/tableData";
import axios from "axios";

const BookIssueApproval = () => {
    const [bookIssueRequests, setBookIssueRequests] = useState([]);
    const [modal, setModal] = useState({ show: false, message: "", action: null, recordId: null });
    const [error, setError] = useState("");

    const bookIssueColumns = [
        { header: "User ID", key: "UserID" },
        { header: "User Name", key: "UserName" },
        { header: "Book ID", key: "BookID" },
        { header: "Book Title", key: "BookTitle" },
        { header: "Request Date", key: "RequestDate" },
        { header: "Borrow Remaining", key: "BorrowRemainings" },
    ];

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/book-issue-approval");
            setBookIssueRequests(response.data);
        } catch (error) {
            console.error("Error fetching book issue approval requests:", error);
            setError("Error fetching data. Please try again.");
        }
    };

    const handleApprove = (userId, bookId) => {
        setModal({
            show: true,
            message: `This will approve the request of User: ${userId} for the Book: ${bookId}`,
            action: "approve",
            recordId: userId,
        });
    };

    const handleReject = (userId) => {
        setModal({
            show: true,
            message: "Are you sure you want to reject this request?",
            action: "reject",
            recordId: userId,
        });
    };

    const confirmAction = async () => {
        const { action, recordId } = modal;

        try {
            if (action === "approve") {
                await axios.put(`http://localhost:5000/api/book-issue-approval/approve/${recordId}`);
                setBookIssueRequests((prevRequests) =>
                    prevRequests.filter((request) => request.UserID !== recordId)
                );
            } else if (action === "reject") {
                await axios.put(`http://localhost:5000/api/book-issue-approval/reject/${recordId}`);
                setBookIssueRequests((prevRequests) =>
                    prevRequests.filter((request) => request.UserID !== recordId)
                );
            }

            setModal({ show: false });
            setError("");
        } catch (error) {
            console.error(`Error ${action}ing the request:`, error);
            setError(`Error ${action}ing the request. Please try again.`);
        }
    };

    return (
        <div className="book-issue-approval-container">
            <h1>Book Issue Approval Requests</h1>
            {bookIssueRequests.length > 0 ? (
                <TableData
                    data={bookIssueRequests}
                    columns={bookIssueColumns}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                />
            ) : (
                <p>{error || "No pending book issue requests."}</p>
            )}

            {modal.show && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{modal.message}</p>
                        <button onClick={confirmAction}>Yes</button>
                        <button onClick={() => setModal({ show: false })}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookIssueApproval;
