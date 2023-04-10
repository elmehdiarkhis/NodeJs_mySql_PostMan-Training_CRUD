const MySqlControllers = require("../Controllers/MySqlControllers") 

const express=require("express");
const router = express.router();



router.post("/create", MySqlControllers.insertAuthor);
router.get("/read",MySqlControllers.selectAllAuthors);
router.post("/update/:newAnne",MySqlControllers.updateOneAuthor);
router.get("/delete/:id",MySqlControllers.deleteOneAuthor);

module.exports=router;
