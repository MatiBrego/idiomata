import { parse } from "csv-parse";
import { Request, Response } from "express"
import { Readable } from "stream"

export function parseFileToCsv(req: Request, res: Response, next: any){
    let rows: string[][] = []

    const readStream = new Readable();
    readStream.push(req.file?.buffer)
    readStream.push(null)
    
    readStream.pipe(parse({delimiter: ","})).on("data", function(row){
        rows.push(row)
    }).on("end", function(){
        req.body = rows
        next()
    }).on("error", function(error){
        return res.status(400).json("Error parsing file")
    })
    
    return
}
