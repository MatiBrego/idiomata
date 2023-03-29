import { Request, Response } from "express";
import jwt from "jwt-simple";
import moment from "moment";

export function withAuth(req: Request, res: Response, next: any){
    if (!req.headers.authorization) {
        return res
          .status(403)
          .send({ message: "Authorization header missing" });
      }
    
      var token = req.headers.authorization.split(" ")[1];
      var payload = jwt.decode(token, "SuperSecretPassword");
   
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: "Token Expired" });
      }
    
      res.locals.context = payload.sub;
      next();
}