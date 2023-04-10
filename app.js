//express==========================================
const express  = require('express');
const res = require('express/lib/response');
const app = express();

//Object Js
app.use(express.urlencoded({extended:true}));
app.use(express.json());
                                                                                                        const { append } = require('express/lib/response');
//sql==============================================
const mysql = require('mysql')

//create Connection
const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    port:3306,
    user: 'sql6512127',
    database: 'sql6512127',
    password: '1mWiPfujxP'
});


//1mWiPfujxP

//Routes============================================
app.listen(22, ()=>{
    console.log('listening to PORT || 22')
})

app.get('/dropTables',(req,res)=>{

    let sql = "DROP TABLE Question"
    db.query( sql , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })

    let sql2 = "DROP TABLE Answers"
    db.query( sql2 , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.get('/createQuestionTable',(req,res)=>{

    let sql ="CREATE TABLE Questions(id int PRIMARY KEY AUTO_INCREMENT,courriel VARCHAR(255),nom VARCHAR(255),prenom VARCHAR(255),question VARCHAR(255))";
    db.query( sql , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})



app.post('/insertQuestion',(req,res)=>{

    let courriel = req.body.courriel;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let question = req.body.question;

    //si la qustion exist deja
    let sqlCheck = `SELECT question FROM Questions WHERE question='${question}'`;
    db.query(sqlCheck , (error,result)=>{

        if(result.length!=0){
            res.send("La Question existe deja dans la Base de Donnee")    
        }else{
            
            let sql =`INSERT INTO Questions(courriel,nom,prenom,question) VALUES ('${courriel}','${nom}','${prenom}','${question}')`;
            db.query( sql , (errorr,resultt)=>{
                if(errorr){
                    console.log(errorr)
                }
                res.send(resultt)
            })  
        }

    })
})

app.get("/allQuestions",(req,res)=>{
    let sql = `SELECT id,question FROM Questions`;
    db.query(sql, (error,result)=>{
        if(error){
            console.log(error)
            return
        }

        if(result.length!=0){
            res.send(result)
            return
        } 
    })
})



app.get('/createAnswerTable',(req,res)=>{
    let sql ="CREATE TABLE Answers(id int,courriel VARCHAR(255),reponse VARCHAR(255),FOREIGN KEY (id) REFERENCES Questions(id))";
    db.query( sql , (err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

a

app.post("/answer/:id",(req,res)=>{
    let id = req.params.id;
    let courriel = req.body.courriel;
    let reponse = req.body.reponse;

    //check if la question exist
    let sql1 = `SELECT id FROM Questions WHERE id=${id}`
    db.query(sql1, (error,result)=>{
        if(result.length==0){
            res.send("vous essayer de repondre a une question qui n'existe pas")
        }else{
            //check si elle lui n'apartient pas
            let sql2 = `SELECT id FROM Questions WHERE id=${id} AND courriel='${courriel}'`;
            db.query(sql2,(errorr,resultt)=>{
                if(resultt.length==0){
                    let sql3 = `INSERT INTO Answers(id,courriel,reponse) VALUES(${id},'${courriel}','${reponse}')`;
                    db.query(sql3, (errorrr,resulttt)=>{
                        if(errorrr){
                            console.log(errorrr)
                        }
                        res.send(resulttt)
                    })
                }else{
                    res.send("Vous ne pouvez pas repondre a votre question")
                }
            })  
        }
    }) 
})



app.get("/answer/:id/:courriel",(req,res)=>{
    let id = req.params.id;
    let courriel = req.params.courriel;
    //check if la reponse existe
    let sqlCheck = `SELECT reponse FROM Answers WHERE id=${id}`
    db.query(sqlCheck, (error,result)=>{
        if(result.length==0){
           res.send("la reponse a cette question est inexistante")
        }else{
            //check si c'est ca reponse a lui
            let sql = `SELECT reponse,courriel FROM Answers WHERE id=${id} AND courriel='${courriel}'`;
            db.query(sql,(errorr,resultt)=>{
                if(resultt.length!=0){
                    res.send(resultt)
                }else{
                    res.send("vous ne pouvez pas voir la responde d'une question qui ne vous appartient pas");
                }
            })
        }
    })
})








