// import React from "react";
import "./tableData.css";
import { formatDate } from "../DateUtils/dateUtils";

const TableData = ({ data, columns, handleApprove, handleReject }) => {
    const hasActions = handleApprove || handleReject;

    return (
        <div className="table-data-container">
            <table className="table-data">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        {hasActions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={`${row.UserID}-${row.BookID || index}`}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                {col.key.toLowerCase().includes("date")
                                    ? formatDate(row[col.key])
                                    : row[col.key]}
                                </td>
                            ))}
                            {hasActions && (
                                <td>
                                    {handleApprove && (
                                        <button onClick={() => handleApprove(row.UserID, row.BookID)}>
                                            Approve
                                        </button>
                                    )}
                                    {handleReject && (
                                        <button onClick={() => handleReject(row.UserID)}>
                                            Reject
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
