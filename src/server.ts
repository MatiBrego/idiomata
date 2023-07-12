import bodyParser from "body-parser";
import express from "express";
import { router } from "./router/router";
import cors from "cors";
import { resetDb } from "./utils/seed";
// resetDb()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.use(cors())

app.use('/api', router)

app.listen(3001, ()=>{
    console.log('[server]: Server is running at http://localhost:3001')
})