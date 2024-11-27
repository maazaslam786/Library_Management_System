const db = require('../db/db');

class BorrowModel {

  // Method to insert borrow data
  // Method to insert borrow data
  static async createBorrow(bookid, userID, borrowDate, returnDate, approvedBy = null, status = 'pending') {
    try {
      const query = `INSERT INTO borrow (Book_id, Borrowed_by, BorrowDate, ReturnDate, Approved_by, status) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

      const result = await db.execute(query, [bookid, userID, borrowDate, returnDate, approvedBy, status]);
      return result[0].insertId;  // Return the ID of the new borrow entry
    } catch (err) {
      throw new Error('Error inserting borrow data: ' + err.message);
    }
  }

  // Method to get all borrow records for a specific user
  static async getBorrowByUserId(userID) {
    try {
      const [rows] = await db.execute('SELECT * FROM borrow WHERE userID = ?', [userID]);
      return rows;
    } catch (err) {
      throw new Error('Error fetching borrow records: ' + err.message);
    }
  }
}

module.exports = BorrowModel;
