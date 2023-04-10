const MongoDbControllers = require("../Controllers/MongoDbControllers")

const express=require("express");
const router = express.router();



router.post("/create", MongoDbControllers.insertBlog);
router.get("/read",MongoDbControllers.selectAllBlogs);
router.post("/update/:newAnne",MongoDbControllers.updateOneBlog);
router.delete("/delete/:id",MongoDbControllers.deleteOneBlog);

module.exports=router;


