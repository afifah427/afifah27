var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'restclient'
});
connection.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Database Connected...')
});
module.exports = connection