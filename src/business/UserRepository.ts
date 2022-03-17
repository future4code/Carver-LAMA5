import {User} from "../model/User"

export interface UserRepository {
    creatUser(user:User):Promise<void>
    getUserByEmail(email: string):Promise<User | null>
}