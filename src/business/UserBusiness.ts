import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserRepository } from "./UserRepository";
import { CustomError } from '../error/CustomError'


export class UserBusiness {

    private userData: UserRepository
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator
    constructor(userDataImplementation: UserRepository) {
        this.userData = userDataImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    async createUser(input: UserInputDTO) {

        try {
            const { name, email, password, role } = input
            if (!email || !name || !password || !role) {
                throw new Error("Campos inválidos")
            }

            const registeredUser = await this.userData.getUserByEmail(email)
            if (registeredUser) {
                throw new Error("Email já cadastrado")
            }
            if (email.indexOf("@") === -1) {
                throw new Error("Invalid email");
            }
            const id = this.idGenerator.generateId()
            const hashedPassword = await this.hashManager.hash(password)


            const user = new User(
                id,
                name,
                email,
                hashedPassword,
                User.stringToUserRole(role)
            )

            const createUser = await this.userData.creatUser(user)

            const token = this.authenticator.generateToken({ id, role })
            return token
        } catch (error) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }


    }

    login = async (input: LoginInputDTO) => {

        try {
            const { email, password } = input
            if (!email || !password) {
                throw new Error("Campos inválidos")
            }


            const user = await this.userData.getUserByEmail(email)

            if (!user) {
                throw new Error("Email não cadastrado")
            }

            const passwordVerification = await this.hashManager.compare(password, user.getPassword())
            if (!passwordVerification) {
                throw new Error("Senha inválida")
            }
            const token = this.authenticator.generateToken({ id: user.getId() })

            return token
        } catch (error) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }


}