const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    Date:{
        type:Date,
        default:Date.now
    },
});

const Todo = mongoose.model("item_rooms",todoschema);

module.exports = Todo;