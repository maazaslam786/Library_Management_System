import React from 'react';
import './tableData.css';

const TableData = ({ data, columns }) => {
    return (
        <div className="table-data-container">
            <table className="table-data">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
