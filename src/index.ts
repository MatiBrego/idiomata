import bodyParser from "body-parser";
import express from "express";
import { router } from "./router/router";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', router)

app.listen(8000, ()=>{
    console.log('[server]: Server is running at http://localhost:8000')
})