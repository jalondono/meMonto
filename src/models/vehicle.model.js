const mongoose = require('mongoose')

const schema = new mongoose.schema
mongoose.Schema('vehicles', {
    "license plate": String,
    "rating": String,
    "review": String,
});
