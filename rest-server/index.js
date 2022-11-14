const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// buat aplikasi parser ke json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restfulapi'
});

//coonnect database

conn.connect((err) => {
    if (err) throw err;
    console.log('My Sql Connected...');
});
// make view for show all data product in database

// app.get('/api/products/:product_id', (req, res) => {
//     let sql = "SELECT * FROM product WHERE product_id=?" + req.params.product_id;
//     let query = conn.query(sql, (err, results) => {
//         res.send(req.params.product_id)
//     });
//     });


app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

// lanjutkan fungsi
// post
app.post('/api/products', function (req, res) {
    let postData  = req.body;
    let query = conn.query('INSERT INTO product SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    });
});
// post
// put
app.put('/api/products/:product_id',(req,res)=>{ 
    let query = conn.query('UPDATE product SET product_name=?, product_price=? WHERE product_id=?',[req.body.product_name, req.body.product_price, req.params.product_id],(err,rows,fields)=>{ 
        if(!err) 
        { 
            res.send("Record has been updated")
        } 
        else{ 
            throw err; 
        }
    }) 
});


app.get('/api/products/:product_id',(req,res)=>{ 
    let query = conn.query('SELECT * FROM product WHERE product_id=?',[req.params.product_id],(err,row,fields)=>{ 
        if(!err) 
        { 
            res.send(JSON.stringify(row)); 
        }
        else{ 
            throw err; 
        } 
    }); 
}); 

app.delete('/api/products/:product_id',(req,res)=>{ 
    let query = conn.query('DELETE FROM product WHERE product_id=?',[req.params.product_id],(err,rows,fields)=>{ 
        if(!err){ 
            res.send('Record has been deleted successfully!'); 
        }
        else{ 
            throw err; 
        } 
    });
}); 
// delete by id

app.delete('api/products', (req, res) => {
    let sql = "DELETE from product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }))
    })
})

// server listening
app.listen(3000, () => {
    console.log('Server Berlalan di Port 3000')
});