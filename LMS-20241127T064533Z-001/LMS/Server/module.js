const express = require('express');
const app = express();
const port = 5000;
const UserModel = require('./Models/usermodel.js'); 
const AdminModel = require('./Models/adminmodel.js')
const BookModel = require('./Models/bookmodels.js')
const StaffModel = require('./Models/staffmodel.js')

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());


app.post('/api/verifymail', async (req, resp) =>{
  const mail = req.body.email
  const result = await UserModel.getUserbyMail(mail);
  const data = {'message':'Success', result: result.length === 0}
  resp.json(data)
})

app.post('/api/verifyphone', async (req, resp) =>{
  const phone = req.body.phone
  const result = await UserModel.getUserbyPhone(phone);
  const data = {'message':'Success', result: result.length === 0}
  resp.json(data)
})

app.post('/api/signup', async (req, resp) => {
  const receivedData = req.body
  const name = receivedData.name
  const email = receivedData.email
  const phone = receivedData.phone
  const address = receivedData.address
  const pass = receivedData.pass

  const id = await UserModel.createUser(name, email, phone, address, pass)
  resp.json({'message':'Success', id: id})


})

app.post('/api/login' , async (req,resp)=>{
  const receivedData = req.body
  const result = await UserModel.getUserbyIdpass(receivedData.id, receivedData.pass)
  const data = {'message':'Success', result: result.length != 0, data: result}
  resp.json(data)
})

app.post('/api/getGenres', async (req, resp) =>{
  const result = await BookModel.getGenres()
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/getPopularBooks', async (req, resp)=>{
  const result = await BookModel.getPopBooks()
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/getBookbyTitle', async (req, resp) =>{
  const receivedData = req.body
  const result = await BookModel.getBook(receivedData.input)
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/getBookbyAuthor', async (req, resp) =>{
  const receivedData = req.body
  const result = await BookModel.getBookbyAuthor(receivedData.input)
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/getBookbyPublisher', async (req, resp) =>{
  const receivedData = req.body
  const result = await BookModel.getBookbyPublisher(receivedData.input)
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/getBookbyISBN', async (req, resp) =>{
  const receivedData = req.body
  const result = await BookModel.getBookbyISBN(receivedData.input)
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/filterGenres', async (req,resp) =>{
  const receivedData = req.body
  const result = await BookModel.getBooksbyGenre(receivedData.input)
  const data = {'message': 'Success', data: result}
  resp.json(data)

})

app.post('/api/Stafflogin' , async (req,resp)=>{
  const receivedData = req.body
  const result = await StaffModel.getStaffbyIdpass(receivedData.id, receivedData.pass)
  const data = {'message':'Success', result: result.length != 0, data: result}
  resp.json(data)
})

app.post('/api/Adminlogin' , async (req,resp)=>{
  const receivedData = req.body
  const result = await AdminModel.getAdminbyIdpass(receivedData.id, receivedData.pass)
  const data = {'message':'Success', result: result.length != 0, data: result}
  resp.json(data)
})

app.post('/api/verifyStaffmail', async (req, resp) =>{
  const mail = req.body.email
  const result = await StaffModel.getStaffbyMail(mail);
  const data = {'message':'Success', result: result.length === 0}
  resp.json(data)
})

app.post('/api/verifyStaffphone', async (req, resp) =>{
  const phone = req.body.phone
  const result = await StaffModel.getStaffbyPhone(phone);
  const data = {'message':'Success', result: result.length === 0}
  resp.json(data)
})

app.post('/api/addStaff', async (req, resp) => {
  const receivedData = req.body
  const name = receivedData.name
  const email = receivedData.email
  const phone = receivedData.phone
  const address = receivedData.address
  const pass = receivedData.pass

  console.log({name, email, phone, address, pass})
  const id = await StaffModel.createStaff(name, email, phone, address, pass)
  resp.json({'message':'Success', id: id})


})

app.post('/api/getReqBooks', async (req, resp) =>{
  const result = await BookModel.getRequiredBooks()
  const data = {'message':'Success', data: result}
  resp.json(data)
})

app.post('/api/addBookCopies', (req, resp)=>{
  const receivedData = req.body
  const result = BookModel.addBookCopies(receivedData.BookID, receivedData.copies, receivedData.addtional)
  const data = {'message':'Success', result: true}
  resp.json(data)
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// // Load required modules
// const express = require('express')
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcrypt'); 
// const verifyRoute = require('./routes/verify');
// require('dotenv').config();

// // Create a top level application
// const app = express()

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json());
// app.use('/api', verifyRoute);

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     multipleStatements: true
// });

// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Unable to connect to the Database:', err);
//         return;
//     }
//     console.log('Connected to the database successfully!');
// });

// const JWT_SECRET = process.env.JWT_SECRET;

// // Login API
// app.post('/api/login', (req, res) => {
//     const { staffID, password } = req.body;

//     const sql = 'SELECT * FROM staff WHERE Staff_id = ?';
//     db.query(sql, [staffID], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Database error' });

//         if (results.length > 0) {
//             const user = results[0];
//             if (user.Pass === password) {
//                 const token = jwt.sign({ staffID: user.Staff_id }, JWT_SECRET, { expiresIn: '1h' });
//                 return res.json({ token });
//             } else {
//                 return res.status(401).json({ message: 'Invalid credentials' });
//             }
//         } else {
//             return res.status(404).json({ message: 'User not found' });
//         }
//     });
// });

// // Fetch book issue approval requests
// app.get('/api/book-issue-approval', (_, res) => {
//     const query = `
//         SELECT 
//             br.Requested_by AS UserID,
//             u.U_name AS UserName,
//             b.Book_id AS BookID,
//             br.Book_title AS BookTitle,
//             br.Request_Date AS RequestDate,
//             (m.Books_allowed - COUNT(bw.Borrow_id)) AS BorrowRemainings
//         FROM 
//             bookRequest br
//         JOIN 
//             user u ON br.Requested_by = u.User_id
//         JOIN 
//             membership m ON u.Membership = m.M_name
//         JOIN 
//             book b ON br.Book_title = b.Title
//         LEFT JOIN 
//             borrow bw ON bw.Borrowed_by = u.User_id AND bw.Return_date IS NULL
//         GROUP BY 
//             br.Requested_by, u.U_name, b.Book_id, br.Book_title, br.Request_Date, m.Books_allowed
//         HAVING 
//             BorrowRemainings > 0
//         ORDER BY 
//             br.Request_Date ASC;
//     `;
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching book issue requests from database:', err);
//             res.status(500).send('Error fetching book issue requests');
//         } else {
//             console.log('Book issue requests:', results);  // Check if results are returned
//             res.json(results);
//         }
//     });
// });

// // Update book issue approval status when approved
// app.put('/api/book-issue-approval/approve/:id', async (req, res) => {
//     const requestId = req.params.id;
//     console.log(`Approving request with ID: ${requestId}`);

//     try {
//         const query = `UPDATE bookRequest SET status = 'approved' WHERE Requested_by = ?`;
//         db.query(query, [requestId], (err, results) => {
//             if (err) {
//                 console.error('Database error approving request:', err);
//                 return res.status(500).send({ message: 'Database error approving request.' });
//             }

//             if (results.affectedRows === 0) {
//                 return res.status(404).send({ message: 'Request not found or already processed.' });
//             }

//             res.status(200).send({ message: 'Request approved successfully!' });
//         });
//     } catch (error) {
//         console.error('Error approving request:', error);
//         res.status(500).send({ message: 'Internal Server Error', error: error.message });
//     }
// });

// // Update book issue approval status when rejected
// app.put('/api/book-issue-approval/reject/:id', async (req, res) => {
//     const requestId = req.params.id;
//     console.log(`Rejecting request with ID: ${requestId}`);

//     try {
//         const query = `DELETE FROM bookRequest WHERE Requested_by = ?`;
//         db.query(query, [requestId], (err, results) => {
//             if (err) {
//                 console.error('Database error rejecting request:', err);
//                 return res.status(500).send({ message: 'Database error rejecting request.' });
//             }

//             if (results.affectedRows === 0) {
//                 return res.status(404).send({ message: 'Request not found or already processed.' });
//             }

//             res.status(200).send({ message: 'Request rejected successfully!' });
//         });
//     } catch (error) {
//         console.error('Error rejecting request:', error);
//         res.status(500).send({ message: 'Internal Server Error', error: error.message });
//     }
// });

// // Fetch book report data API 
// app.get('/api/generate-report', async (_, res) => {
//     const query = `
//         SELECT 
//             u.User_id AS UserID, 
//             u.U_name AS UserName, 
//             b.Title AS BookTitle, 
//             br.Borrow_date AS BorrowDate, 
//             br.Return_date AS ReturnDate, 
//             COALESCE(m.Ext, 0) AS Extensions,
//             b.B_status AS BookStatus
//             FROM 
//             borrow br
//             JOIN 
//             user u ON br.Borrowed_by = u.User_id
//             JOIN 
//             book b ON br.Book_id = b.Book_id
//             JOIN 
//             membership m ON u.Membership = m.M_name
//             ORDER BY 
//             br.Return_date ASC;
//     `;
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching report data from database:', err);
//             res.status(500).send('Error fetching report data');
//         } else {
//             res.json(results);
//         }
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 1000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
