import express from "express"

const app = express(); 

app.get('/', (req, res) => {

    res.send("Hallo Kalian");
});

app.listen(3000, () => {
    console.info("Server Berjalan di Port 3000");
});