import { Router } from "express";
import { dbCon } from "../db/dbCon";
import { login } from "./sqlQuery/query"

const loginout = Router()

type userT = [{name: string; password: string; type: "admin"|"user"}] | []

loginout.get("/login", (req, res)=>{
    try{
        const { name, password, type } = req.body
        const { session } = req
        if(session.username && session.username == name){
            res.redirect("/session/home")
        }
        else{
            dbCon.query(login(name, password, type), (err: any, result: userT)=>{
                if (err) throw err
                if(result.length){
                    session.username = result[0].name
                    session.usertype = result[0].type
                    res.redirect("/session/home")
                }
                else{
                    res.status(403).send("LOGIN FAILED :( \n INVALID CREDENTIALS")
                }
            })
        }
    }
    catch(err){
        res.status(500).send("FAILED TO LOGIN")
    }
})

loginout.post("/logout", (req, res)=>{
    try{
        const { session } = req
        session.destroy((err)=>{
            if (err) throw err
            res.status(200).send(
                "THANKS LOGIN AGAIN WHEN NEEDED SEE YOU SOON"
            )
        })
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

loginout.get("/home", (req, res)=>{
    try{
        const { session } = req
        if(session.username){
            res.status(200).send(
                `
                WELCOME to NEEDFULLS ${session.username} you are ${session.usertype}
                `
            )
        }
        else{
            res.status(403).send("PLEASE LOGIN FIRST")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

export { loginout }