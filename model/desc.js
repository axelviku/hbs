const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const noteSchema = new mongoose.Schema({
    note:{
        type:String
      },
      userId:ObjectId
});
const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;