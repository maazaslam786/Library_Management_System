const db = require('../db/db')

class StaffModel {
    static async getStaffbyIdpass(Staff_id, pass){
        try {
            const [rows] = await db.execute('SELECT * FROM Staff WHERE Staff_id = ? AND Pass = md5(?)', [Staff_id,pass])
            return rows
        } catch(err){
            throw new Error('Error fetching the Staff: ' + err.message)
        }
    }

    static async getStaffbyMail(mail){
        try {
            const [rows] = await db.execute('SELECT * FROM Staff WHERE Email = ?', [mail])
            return rows
        } catch(err){
            throw new Error('Error fetching the Staff: ' + err.message)
        }
    }

    static async getStaffbyPhone(phone){
        try {
            const [rows] = await db.execute('SELECT * FROM Staff WHERE Phone = ?', [phone])
            return rows
        } catch(err){
            throw new Error('Error fetching the Staff: ' + err.message)
        }
    }

    static async createStaff(name, email, phone, address, pass){
        try {

            const subquery1 = await db.execute('SET @st_seq_value = NULL')
            const subquery2 = await db.execute('CALL seq_next_value("st_sequence", @st_seq_value)')
            const res = await db.execute('SELECT @st_seq_value')

            const id = res[0][0]['@st_seq_value']
            const result = await db.execute(
                'INSERT INTO Staff(Staff_id, S_name, Email, Phone, Address, Pass) VALUES (?, ?, ?, ?, ?, md5(?))',[id, name, email, phone, address, pass]
            )
            console.log(result)
            return id
        } catch(err){
            throw new Error('Error creating error: '+ err.message)
        }
    }
}

module.exports = StaffModel;