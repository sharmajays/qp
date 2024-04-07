import express from 'express';
import { loginout } from './session/loginout';
import { admin } from './adminRoutes/admin';
import { user } from './userRoutes/user';
import bodyParser from 'body-parser';
import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        username: string,
        usertype: "admin" | "user"
    }
}

const app = express();

app.use(bodyParser.json())

app.use(session({
    secret: 'needfulls-qp',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000 }
}));

app.use("/session", loginout)
app.use("/admin", admin)
app.use("/user", user)

export { app }

