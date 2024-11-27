const db = require('../db/db')

class AdminModel {
    static async getAdminbyIdpass(AdminID, pass){
        try {
            const [rows] = await db.execute('SELECT * FROM admin WHERE Admin_id = ? AND Pass = ?', [AdminID,pass])
            return rows
        } catch(err){
            throw new Error('Error fetching the Admin: ' + err.message)
        }
    }
}

module.exports = AdminModel;