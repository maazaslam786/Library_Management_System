const db = require('../db/db')

class UserModel {

    static async getUserbyId(userID){
        try {
            const [rows] = await db.execute('SELECT * FROM user WHERE userID = ?', [userID])
            return rows
        } catch(err){
            throw new Error('Error fetching the user: ' + err.message)
        }
    }

    static async getUserbyIdpass(userID, pass){
        try {
            const [rows] = await db.execute('SELECT * FROM user WHERE userID = ? AND pass = md5(?)', [userID,pass])
            return rows
        } catch(err){
            throw new Error('Error fetching the user: ' + err.message)
        }
    }
    static async getUserbyMail(mail){
        try {
            const [rows] = await db.execute('SELECT * FROM user WHERE Email = ?', [mail])
            return rows
        } catch(err){
            throw new Error('Error fetching the user: ' + err.message)
        }
    }

    static async getUserbyPhone(phone){
        try {
            const [rows] = await db.execute('SELECT * FROM user WHERE Phone = ?', [phone])
            return rows
        } catch(err){
            throw new Error('Error fetching the user: ' + err.message)
        }
    }

    static async createUser(name, email, phone, address, pass){
        try {

            const subquery1 = await db.execute('SET @us_seq_value = NULL')
            const subquery2 = await db.execute('CALL seq_next_value("us_sequence", @us_seq_value)')
            const res = await db.execute('SELECT @us_seq_value')

            const id = res[0][0]['@us_seq_value']
            const result = await db.execute(
                'INSERT INTO user(userID, userName, Email, Phone, Address, pass) VALUES (?, ?, ?, ?, ?, md5(?))',[id, name, email, phone, address, pass]
            )
            console.log(result)
            return id
        } catch(err){
            throw new Error('Error creating error: '+ err.message)
        }
    }
}

module.exports = UserModel;