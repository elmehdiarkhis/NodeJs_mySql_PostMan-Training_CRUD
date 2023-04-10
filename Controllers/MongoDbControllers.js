const Blog = require("../models/Blog")
const express=require("express");



//=====
const insertBlog = (req,res)=>{
    
    let id = req.body.id;

    //check if l'author existe (On veux pas de doublons)
    Blog.findById(id)
    .then(result=>{

        if(!result){
            res.send("l'Autheur existe deja")
            return
        }

        const new_Blog = new Blog(req.body).save()
        .then(resultInsert=>{
            res.send("Blog Inserted",resultInsert)
        })
        .catch(errInsert=>{
            console.log(errInsert)
        })

    })
    .catch(err=>{
        console.log(err)
    })
}
// Blog.findOne({})

//======
const selectAllBlogs = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })
}


//===
const updateOneBlog = (req,res)=>{
    let old_annee = req.body.old_annee;
    let newAnnee = req.params.newAnnee;

    Blog.UpdateOne({annee:old_annee},{$set: {annee:newAnnee} })
    .then(result=>{
        res.send("UPDATED",result)
    })
    .catch(err=>{
        console.log(err);
    })
}


//================================================================
const deleteOneBlog = (req,res)=>{
    let id = req.params.id;
    Blog.findAndDeleteById(id)
    .then(result=>{
        res.json({redirect:"/index"})
    })
    .catch(err=>{
        console.log(err)
    })
}
//Blog.findOneAndRemove({})

//<script>
const btnDelete= document.querySelector("#delete");
btnDelete.addEventListener("click",(e)=>{
  fetch(`/details/${btnDelete.dataset.doc}`,{method:'DELETE'})
  .then(result=> result.json() )
  .then(data=> window.location.href = data.redirect)
  .catch(error=> console.log(error))
})
//</script>
//================================================================


module.exports = {
    insertBlog,
    selectAllBlogs,
    updateOneBlog,
    deleteOneBlog
}


