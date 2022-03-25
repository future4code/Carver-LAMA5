import { UserInputDTO, LoginInputDTO, User, AuthenticationData } from "../../model/user/User";
import { IdGenerator } from "../../services/IdGenerator";
import { HashManager } from "../../services/HashManager";
import { Authenticator } from "../../services/Authenticator";
import { UserRepository } from "./userRepository";
import { CustomError } from "../../error/CustomError";

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

    signup = async (user: UserInputDTO) => {
        const { name, email, password, role } = user

        const id = this.idGenerator.generate()

        if (!name) {
            throw new CustomError(422, "Please, inform a name for new user.")
        }
        if (!email) {
            throw new CustomError(422, "Please, inform a email for new user.")
        }
        if (email.indexOf("@") === -1) {
            throw new CustomError(422,"Invalid email")
        }
        if (!password) {
            throw new CustomError(422, "Please, inform a password for new user.")
        }
        if (!role) {
            throw new CustomError(422, "Please, inform a role for new user.")
        }
        if (role.toLocaleUpperCase() !== "ADMIN" && role.toLocaleUpperCase() !== "NORMAL") {
            throw new CustomError(422, "Role must be ADMIN, or NORMAL.")
        }

        const userRegistered = await this.userData.getUserByEmail(email)

        if (userRegistered) {
            throw new CustomError(409, "This e-mail is already in use")
        }

        const hashPassword = await this.hashManager.hash(password)

        const userData = new User(id, name, email, hashPassword, role)

        await this.userData.signup(userData)

        const authenticationData: AuthenticationData = {
            id: id,
            role: role
        }

        const accessToken = this.authenticator.generateToken(authenticationData)

        return { accessToken }
    }

    login = async (loginData: LoginInputDTO) => {
        const { email, password } = loginData
        
        if (!email) {
            throw new CustomError(422, "Please, inform a email for login.")
        }
        if (email.indexOf("@") === -1) {
            throw new CustomError(422,"Invalid email")
        }
        if (!password) {
            throw new CustomError(422, "Please, inform a password for new user.")
        }

        const userData: User = await this.userData.getUserByEmail(email)
        
        if (!userData) {
            throw new CustomError(404, "User not found.")
        }

        const passwordVerification = await this.hashManager.compare(password, userData!.getPassword())

        if (!passwordVerification) {
            throw new CustomError(403, "Invalid credentials.")
        }

        const authenticationData: AuthenticationData = {
            id: userData!.getId(),
            role: userData!.getRole()
        }

        const accessToken = this.authenticator.generateToken(authenticationData)

        return accessToken
    }

}