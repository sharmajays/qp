import { Router } from "express";
import { dbCon } from "../db/dbCon";
import { setOrder, viewGrocery } from "./sqlQuery/query";

const user = Router()

user.post("/setOrder", async(req,res)=>{
    try{
        const { items } = req.body
        const { session } = req
        if(session.usertype && ["admin","user"].includes(session.usertype)){
            let orderList: string[] = []
            if (items && items.length > 0) {
                for (const item of items) {
                    const result:any = await new Promise((resolve, reject) => {
                        dbCon.query(
                            setOrder(session.username!, item.name, item.quantity),
                            (err: any, result: any) => {
                                resolve(result);
                            }
                        );
                    });
                    if (result && result?.affectedRows > 0) {
                        orderList.push(item.name);
                    }
                }
                res.status(200).send(`ORDER CREATED SUCCESSFULLY FOR ${orderList}`);
            }
        }
        else{
            res.status(403).send("PLEASE LOGIN FIRST")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

user.get('/viewGrocery',(req,res)=>{
    try{
        const { session } = req
        if(session.usertype && ["admin","user"].includes(session.usertype)){
            dbCon.query(viewGrocery(), (err: any, result:any)=>{
                if(result && result.length){
                    const gList = result.map((item: {name: string })=> item.name)
                    res.status(200).json(gList)
                }
            })
        }else{
            res.status(403).send("PLEASE LOGIN FIRST")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})

export { user }