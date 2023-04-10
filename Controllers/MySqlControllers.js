const mySql = require("mysql");
const db = mySql.createConnection({
//.......
})

const express=require("express");



const insertAuthor = (req,res)=>{

    //recuperer les values
    let id = req.body.id;
    let nom = req.body.nom;
    let annee= req.body.annee;
    let nationalite = req.body.nationalite;
    //=====================

    //check if l'author existe (On veux pas de doublons)
    let sqlCheck = `SELECT id FROM Authors WHERE id=${id}`;
    db.query(sqlCheck , (err,result)=>{

        if(err){
            console.log(err)
            return
        }

        if(result.length!=0){
            res.send("l'Author que vous voulais inserer existe deja")
            return
        }

        // 0 err + Pas d'Autheur >Insert
        let sqlInsert = `INSERT INTO Authors VALUES(${id},'${nom}',${annee},'${nationalite}')`
        db.query( sqlInsert , (err,result)=>{

            if(err){
                console.log(err)
                return
            }

            res.send("Author Inserted",result);
        })
    })
};



const selectAllAuthors = (req,res)=>{
    let sql = `SELECT id,nom FROM Authors`;
    db.query( sql , (err,result)=>{

        if(err){
            console.log(err)
            return;
        }

        res.send(result);
    })
    
}


const updateOneAuthor = (req,res)=>{
    let old_annee = req.body.old_annee;
    let newAnnee = req.params.newAnnee;

    let sql = `UPDATE Authors SET annee=${newAnnee} WHERE annee=${old_annee}`;
    db.query(sql,(err,result)=>{

        if(err){
            console.lof(err);
            return;
        }

        res.send("UPDATED!",result)
    })
}


const deleteOneAuthor = (req,res)=>{
    let id = req.params.id;

    let sql = `DELETE FROM Authors WHERE id=${id}`;
    db.query(sql,(err,result)=>{

        if(err){
            console.log(err)
            return;
        }

        res.send("DELETED",result)
    })
}


module.exports = {
    insertAuthor,
    selectAllAuthors,
    updateOneAuthor,
    deleteOneAuthor
}