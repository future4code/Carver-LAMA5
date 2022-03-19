import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../../model/user/User";
import { UserBusiness } from "../../business/user/UserBusiness";
import { UserDatabase } from "../../data/user/UserDatabase";

export class UserController {

    private userBusiness: UserBusiness
    constructor() {
        this.userBusiness = new UserBusiness(new UserDatabase)
    }
    signup = async (req: Request, res: Response) => {
        const {name, email, password, role} = req.body
        const userInput: UserInputDTO = {
            name,
            email,
            password,
            role
        }
        try {
            const token = await this.userBusiness.signup(userInput)

            res.status(201).send({ token })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }       
    }

    login = async (req: Request, res: Response) => { 
        const {email, password} = req.body
        const loginInput: LoginInputDTO = {
            email,
            password
        }
        try {
            const token = await this.userBusiness.login(loginInput)

            res.status(200).send({ token })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        } 
    }   

}