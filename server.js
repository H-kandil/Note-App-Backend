const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// The Main settings إعدادات أساسية
app.use(cors());
app.use(express.json()); 

//Connecting to DB الاتصال بقاعدة البيانات
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error(" MongoDB Atlas error:", err));


// Runing the Server تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
