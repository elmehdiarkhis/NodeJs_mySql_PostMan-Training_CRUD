const studentsControllers = require("../Controllers/studentsControllers") 

const express=require("express");
const router = express.router();



router.post("/", studentsControllers.insertStudent);
router.put("/",studentsControllers.selectAllStudent);
router.put("/:id",studentsControllers.selectAllStudentInfos);
router.get("/delete/:id",studentsControllers.deleteOneStudent);

module.exports=router;
