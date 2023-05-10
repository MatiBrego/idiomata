import { Request, Response } from "express";
import jwt from "jwt-simple";

//Save the tokens that are created to this list, in order to remove them if user logs out
export const validTokens = new Set<String>();

export function withAuth(req: Request, res: Response, next: any){
  if (!req.headers.authorization) {
      return res
        .status(403)
        .send({ message: "Authorization header missing" });
  }
  
  try {
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, "SuperSecretPassword");
  } catch (error) {
    return res.status(401).send({message: "Invalid Token"})
  }

  //If token is not on the list, it is not valid
  //TODO uncomment this
  // if(!validTokens.has(token)){
  //   return res.status(403).send({message: "Token no longer valid"})
  // }

  res.locals.context = payload.sub;
  next();
}

export function removeAuth(req: Request, res: Response, next: any) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Authorization header missing" });
  }

  var token = req.headers.authorization.split(" ")[1]
  validTokens.delete(token)

  next()
}