const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/CozyCorners");
}
main()
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/cozycorners", (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
