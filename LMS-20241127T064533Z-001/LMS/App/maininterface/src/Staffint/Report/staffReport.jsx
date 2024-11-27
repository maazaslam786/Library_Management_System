import { useEffect, useState } from "react";
import TableData from "../TableData/tableData";
import './staffReport.css';
import axios from "axios";

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState("");

    const reportColumns = [
        { header: "User ID", key: "UserID" },
        { header: "User Name", key: "UserName" },
        { header: "Book Title", key: "BookTitle" },
        { header: "Borrow Date", key: "BorrowDate" },
        { header: "Return Date", key: "ReturnDate" },
        { header: "Book Status", key: "BookStatus" },
        { header: "Extensions", key: "Extensions" }
    ];

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/generate-report");
                setReportData(response.data);
                setError("");
            } catch (error) {
                console.error("Error fetching report data:", error);
                setError("Failed to fetch report data. Please try again.");
            }
        };

        fetchReport();
    }, []);

    return (
        <div className="generate-report-container">
            <h1>Books Tracking Report</h1>
            {error && <p className="error-message">{error}</p>}
            {reportData.length > 0 ? (
                <TableData data={reportData} columns={reportColumns} />
            ) : (
                !error && <p>Loading report data...</p>
            )}
        </div>
    );
};

export default Report;
