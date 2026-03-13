const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({

 title:{
  type:String,
  required:true
 },

 author:{
  type:String,
  required:true
 },

 category:{
  type:String,
  required:true
 },

 coverImage:String,
 pdfFile:String,

 createdAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Book",bookSchema)