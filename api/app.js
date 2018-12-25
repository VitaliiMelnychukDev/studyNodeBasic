const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("../nodemon");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");


mongoose.connect("mongodb+srv://root:" + env.env.PASSWORD + "@node-api-uztuy.mongodb.net/test",
    {useNewUrlParser: true});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use("/", (req, res) => {
    res.status(200);
    res.json({"message": "Main Page"});
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;