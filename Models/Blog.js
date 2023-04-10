const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    titre:{
        type:String,
        requires:true
    },
    body:{
        type:String,
        requires:true
    },
},{Timestamps:true});
const Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;