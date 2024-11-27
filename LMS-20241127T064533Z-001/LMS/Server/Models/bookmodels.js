const db = require('../db/db')

class BookModel {

    static async getGenres(){
        try {
            const [rows] = await db.execute('SELECT DISTINCT Genre FROM book')
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getPopBooks(){
        try {
            const [rows] = await db.execute('SELECT * FROM book where Books_count >= 5 order by Books_count DESC LIMIT 10')
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getBook(UserInput){
        function generateQuery(input){
            const words = input.split(/\s+/)
            const likeClause = words.map(word => `Title LIKE "%${word}%"`)
            const query = `WHERE ${likeClause.join(' OR ')}`
            return query
        }
        try {
            const query  = 'select * from book '+generateQuery(UserInput) + ' ORDER BY Books_count DESC limit 10'
            const [rows] = await db.execute(query)
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getBookbyAuthor(UserInput){
        function generateQuery(input){
            const words = input.split(/\s+/)
            const likeClause = words.map(word => `Author LIKE "%${word}%"`)
            const query = `WHERE ${likeClause.join(' OR ')}`
            return query
        }
        try {
            const query  = 'select * from book '+generateQuery(UserInput) + ' ORDER BY Books_count DESC limit 10'
            const [rows] = await db.execute(query)
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getBookbyPublisher(UserInput){
        function generateQuery(input){
            const words = input.split(/\s+/)
            const likeClause = words.map(word => `Publisher LIKE "%${word}%"`)
            const query = `WHERE ${likeClause.join(' OR ')}`
            return query
        }
        try {
            const query  = 'select * from book '+generateQuery(UserInput) + ' ORDER BY Books_count DESC limit 10'
            const [rows] = await db.execute(query)
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getBookbyISBN(isbn){
        try {
            const [rows] = await db.execute('SELECT * FROM book WHERE ISBN = ?',[isbn])
            return rows
        } catch(err){
            throw new Error('Error fetching books: ' + err.message)
        }
    }

    static async getBooksbyGenre(genres){
        try{
            const placeholders = genres.map(() => '?').join(', ')
            const query = `SELECT * FROM book WHERE Genre IN (${placeholders}) ORDER BY Books_count DESC limit 15`
            const [rows] = await db.execute(query, genres)
            return rows
        }catch(err){
            throw new Error('Error fetching books' + err.message)
        }

    }

    static async getRequiredBooks(){
        try{
            const [rows] = await db.execute('SELECT * FROM book WHERE B_status = "more copies required" ')
            return rows
        } catch(err){
            throw new Error('Error fetching books: '+ err.message)
        }
    }

    static async addBookCopies(BookID, copies, additionalCopies){
        try{
            const [rows] = await db.execute('UPDATE book SET Books_count = ? WHERE Book_id = ?', [copies + additionalCopies, BookID])
            const [rows2] = await db.execute('UPDATE book SET B_status = "enough available" WHERE Book_id = ?',[BookID])
            return rows
        }catch(err){
            throw new Error('Error Adding Book Copies: '+ err.message)
        }
    }
}

module.exports = BookModel;