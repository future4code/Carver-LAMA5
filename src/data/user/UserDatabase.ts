import { BaseDatabase } from "../BaseDatabase";
import { User } from "../../model/user/User";
import { UserRepository } from "../../business/user/userRepository";
import { CustomError } from "../../error/CustomError";

export class UserDatabase extends BaseDatabase implements UserRepository {

  protected TABLE_NAME = "NOME_TABELAS_USUÁRIOS"

  signup = async (user: User) => {
    try {
      await BaseDatabase
        .connection(this.TABLE_NAME)
        .insert({
          "id": user.getId(),
          "name": user.getName(),
          "email": user.getEmail(),
          "password": user.getPassword(),
          "role": user.getRole()
        })
    } catch (error) {
      if (error instanceof CustomError) {
        throw new Error(error.message)
      }
    }
    this.closeConnection()

  }

  getUserByEmail = async (email: string) => {
    try {
      const queryResult: any = await BaseDatabase
        .connection(this.TABLE_NAME)
        .select()
        .where({ email })
      
      if(queryResult[0]){
      const result = new User(
        queryResult[0]!.id,
        queryResult[0]!.name,
        queryResult[0]!.email,
        queryResult[0]!.password,
        queryResult[0]!.role,
      )
        return result
      } else {
        return null
      }
      
    } catch (error) {
      if (error instanceof CustomError) {
        throw new Error(error.message)
      }
    }

  }
}
