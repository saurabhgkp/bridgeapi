const express = require("express")
const app = express()
const cors = require("cors");
var logger = require("morgan");
const errorHandler = require("./utils/errorHandler");
// const mongoose = require("mongoose");
require("dotenv").config();

const tokenRoutes = require('./routes/tokenRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const paramRoutes = require('./routes/paramRoutes');

const PORT = process.env.PORT || 4000;
// const CONNECTION_URL = process.env.CONNECTION_URL;


app.use(express.json());
app.use(cors("*"));
app.use(logger("dev"));



app.use(express.json())



app.use('/tokens', tokenRoutes);
app.use('/quotes', quoteRoutes);
app.use('/params', paramRoutes);

// Global error handler
app.use(errorHandler);


app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
)
// mongoose
//     .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() =>
//         app.listen(PORT, () =>
//             console.log(`Server Running on Port: http://localhost:${PORT}`)
//         )
//     )
//     .catch((error) => console.log(`${error} did not connect`));