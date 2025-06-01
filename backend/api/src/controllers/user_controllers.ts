import "dotenv/config";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserService } from "../services/user_service";
import { generateToken } from "../../Auth/generate_token";

import { User } from "../../../src/entities/User";
import { UserAlreadyExistsError } from "../../Errors/AlreadyExistsUser";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
   try {
      const data = await userService.getAll();
      res.status(200).json(data);
   }
   catch (err) {
      //Depure only
      console.log(`Error: ${err}`)
      res.status(400).json({ error: "400: Bad request :(" })
   }
}

export const loginUser = async(req: Request, res: Response): Promise<User | any > => {
   try{
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);
      if(user) { 
         const isPassword = await bcrypt.compare(password, user.password); 
         if(isPassword) {
            const payload = { username: user.username, email: user.email };
            const token = await generateToken({ payload });
            return res.status(200).json({ token, user: user });
         }
         return res.status(401).json({ MessageError: 'Invalid password!' })
      }
   }
   catch(err) {
      //instanceof ensures that Error will not be undefined; 
      if(err instanceof Error) res.status(409).json({MessageError: err.message });
   }
}

export const registerUser = async (req: Request, res: Response): Promise< User| any> => {
   const required = ["username", "email", "phone", "password"]

   const { username, email, phone, password } = req.body;
   for (let i of required) {
      if (!req.body[i]) res.status(400).json({ MessageError: "All credentials is required!!"});
   }
   try {
      const user = await userService.createUser({ username, email, phone, password });
      if(user) {
         return res.status(200).json({ user });
      }
      res.status(422).json({ServerError: "Unprocessable request :("});
   }
   catch (error) {
      if(error instanceof Error) {
         return res.status(409).json({ MessageError: error.message});
      };
   }
}

export const protectedRouter = (req: Request, res: Response) => {
   res.status(200);
}