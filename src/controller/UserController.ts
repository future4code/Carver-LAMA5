import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import  BaseDatabase  from "../data/BaseDatabase";
import  UserDatabase from "../data/UserDatabase";

export class UserController {

    private userBusiness: UserBusiness
    constructor(){
        this.userBusiness = new UserBusiness( new UserDatabase)
    }


    async signup(req: Request, res: Response) {

        const input: UserInputDTO = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }

        try {

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
         }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        const loginData: LoginInputDTO = {
            email: req.body.email,
            password: req.body.password
        };

        try {
            const token = await this.userBusiness.login(loginData);

            res.status(200).send({ token });

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
         }

        await BaseDatabase.destroyConnection();
    }

}