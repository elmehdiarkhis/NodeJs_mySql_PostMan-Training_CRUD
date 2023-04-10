const mySql = require("mysql");
const db = mySql.createConnection({
//.......
})

const express=require("express");

app.get('/createTableStudents',(req,res)=>{
    let sql ="CREATE TABLE Students(id int PRIMARY KEY AUTO_INCREMENT,matricule VARCHAR(30),nom VARCHAR(30),prenom VARCHAR(30),courriel VARCHAR(75))";
    db.query( sql , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/createTableUsers',(req,res)=>{
    let sql ="CREATE TABLE Users(id int PRIMARY KEY AUTO_INCREMENT,courriel VARCHAR(75),pass VARCHAR(150)";
    db.query( sql , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

const insertStudent = (req,res)=>{

    //recuperer les values
    let matricule = req.body.matricule;
    let nom = req.body.nom;
    let prenom= req.body.prenom;
    let courriel = req.body.courriel;
    //========
    let user = req.body.user;
    let pass = req.body.pass;
    //=====================

    if(user=="mgrenier@teccart.qc.ca" && pass=="AAAaaa111"){
        //check if le matricule existe (On veux pas de doublons)
        let sqlCheck = `SELECT matricule FROM Students WHERE matricule='${matricule}'`;
        db.query(sqlCheck , (err,result)=>{

            if(err){
                console.log(err)
                return
            }

            if(result.length!=0){
                res.send("Un Student avec ce matricule existe deja, vous ne pouvais pas l'ajouter !!")
                return
            }

            // 0 err + Pas de student >Insert
            let sqlInsert = `INSERT INTO Students VALUES('${matricule}','${nom}',${prenom},'${courriel}')`
            db.query( sqlInsert , (err,result)=>{

                if(err){
                    console.log(err)
                    return
                }

                res.send("Student Inserted",result);
            })
        })
    }else{
        res.send("Vous ne pouvais pas ajouter d'eleves , seulement Monsieur MGrenier qui a acces ")
    }
    
};



const selectAllStudent = (req,res)=>{

    //========
    let user = req.body.user;
    let pass = req.body.pass;
    //=====================

    if(user=="mgrenier@teccart.qc.ca" && pass=="AAAaaa111"){
        let sql = `SELECT * FROM Students`;
        db.query( sql , (err,result)=>{

            if(err){
                console.log(err)
                return;
            }

            res.send(result);
        })    
    }else{
        res.send("Vous ne pouvais voir les eleves , seulement Monsieur MGrenier qui a acces")
    }

    
}



const selectAllStudentInfos = (req,res)=>{

    //========
    let user = req.body.user;
    let pass = req.body.pass;
    //========
    let id = req.params.id;
    //=====================

    if(user=="mgrenier@teccart.qc.ca" && pass=="AAAaaa111"){
        let sql = `SELECT nom,prenom,matricule FROM Students WHERE id=${id}`;
        db.query( sql , (err,result)=>{

            if(err){
                console.log(err)
                return;
            }

            res.send(result);
        })    
    }else{
        res.send("Vous ne pouvais pas voir les eleves , seulement Monsieur MGrenier qui a acces")
    }

    
}



const deleteOneStudent = (req,res)=>{
    //========
    let user = req.body.user;
    let pass = req.body.pass;
    //========
    let id = req.params.id;
    //=====================

    if(user=="mgrenier@teccart.qc.ca" && pass=="AAAaaa111"){
        //check if l'etudiant existe 
        let sqlCheck = `SELECT nom FROM Students WHERE id=${id}`;
        db.query(sqlCheck , (err,result)=>{

            if(err){
                console.log(err)
                return
            }

            if(result.length==0){
                res.send("Un Student avec ce ID n'existe pas!!")
                return
            }

            // 0 err + Pas de student >Insert
            let sql = `DELETE FROM Students WHERE id=${id}`;
            db.query(sql,(err,result)=>{

                if(err){
                    console.log(err)
                    return;
                }

                res.send("DELETED",result)
            })
        })
    }else{
        res.send("Vous ne pouvais pas supprimmer d'eleves , seulement Monsieur MGrenier qui a acces ")
    }






    
}


module.exports = {
    insertStudent,
    selectAllStudent,
    selectAllStudentInfos,
    deleteOneStudent
}