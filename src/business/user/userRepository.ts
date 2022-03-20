import { User } from "../../model/user/User";


export interface UserRepository { 
    signup(user: User): Promise<void>
    getUserByEmail(email: string): Promise<User | null>
    getUserById(id: string): Promise<User | null>
}
