import { Router } from "express";
import { dbCon } from "../db/dbCon";
import { addItem, deleteItem, updateItem, getItems } from "./sqlQuery/query";

const admin = Router()

admin.post("/addItem", (req,res)=>{
    try{
        const { name, quantity, unit } = req.body
        const { session } = req
        if(session.usertype && session.usertype == "admin"){
            dbCon.query(addItem(name, quantity, unit), (err: any, result:any) =>{
                if(result && result?.affectedRows > 0){
                    res.status(200).send(`ITEM ${name} ADDEDD SUCCESSFULLY`)
                }
                else{
                    res.status(200).send(`FAILED TO ADD ITEM ${name} CHECK IF ITEM ALREADY EXIST THEN UPDATE IT DONT ADD`)
                }
            })
        }
        else{
            res.status(403).send("PLEASE LOGIN AS ADMIN")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

admin.post("/updateItem", (req,res)=>{
    try{
        const { name, quantity, unit } = req.body
        const { session } = req
        if(session.usertype && session.usertype == "admin"){
            dbCon.query(updateItem(name, quantity, unit), (err: any, result:any) =>{
                if(result && result?.affectedRows > 0){
                    res.status(200).send(`ITEM ${name} UPDATED SUCCESSFULLY`)
                }
                else{
                    res.status(200).send(`FAILED TO UPDATE ITEM ${name} CHECK IF EXIST IF OT THEN FIRST ADD`)
                }
            })
        }
        else{
            res.status(403).send("PLEASE LOGIN AS ADMIN")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

admin.delete("/deleteItem", (req,res)=>{
    try{
        const { name } = req.body
        const { session } = req
        if(session.usertype && session.usertype == "admin"){
            dbCon.query(deleteItem(name), (err: any, result:any) =>{
                if(result && result?.affectedRows > 0){
                    res.status(200).send(`ITEM ${name} DELETED SUCCESSFULLY`)
                }
                else{
                    res.status(200).send(`FAILED TO DELETE ITEM ${name} CHECK IF IT EXIST`)
                }
            })
        }
        else{
            res.status(403).send("PLEASE LOGIN AS ADMIN")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

admin.get("/getItems", (req,res)=>{
    try{

        type groceryReturnType = {
            name: string;
            quantity: string;
            unit: string;
        }[]

        const { name } = req.body
        const { session } = req
        if(session.usertype && session.usertype == "admin"){
            dbCon.query(getItems(name), (err: any, result: groceryReturnType) =>{
                if(result && result.length){
                    res.status(200).json(result)
                }
                else{
                    res.status(200).send(name ? `FAILED TO FETCH ITEM ${name} CHECK IF IT EXIST`: `FAILED TO FETCH GROCERY INVENTORY MAY BE EMPTY`)
                }
            })
        }
        else{
            res.status(403).send("PLEASE LOGIN AS ADMIN")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

export { admin }