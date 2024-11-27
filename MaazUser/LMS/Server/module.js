const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const UserModel = require('./Models/usermodel.js'); 
const AdminModel = require('./Models/adminmodel.js')
const BookModel = require('./Models/bookmodels.js')
const StaffModel = require('./Models/staffmodel.js')
const BorrowModel = require('./Models/borrow-model.js')

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

app.post('/api/borrowform', async (req, resp) => {
  const { bookid, userID, borrowDate, returnDate, approvedBy, status } = req.body;

  try {
    const borrowId = await BorrowModel.createBorrow(bookid, userID, borrowDate, returnDate, approvedBy, status);
    resp.json({ success: true, id: borrowId, message: 'Borrow data inserted successfully' });
  } catch (err) {
    resp.status(500).json({ success: false, error: 'Failed to insert borrow data: ' + err.message });
  }
});

app.get('/api/borrowhistory/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const borrowHistory = await BorrowModel.getBorrowByUserId(userID);
    res.status(200).json({ success: true, data: borrowHistory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});