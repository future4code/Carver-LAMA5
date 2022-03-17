import { UserRepository } from "../business/UserRepository";
import  BaseDatabase  from "./BaseDatabase";
import { User } from "../model/User";


export default class UserDatabase extends BaseDatabase implements UserRepository {

  protected TABLE_USER = "lama_user";


  creatUser = async (user: User): Promise<void> => {
    try {
      await BaseDatabase
        .connection(this.TABLE_USER)
        .insert(user)
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

  getUserByEmail = async (email: string) => {
    try {
      const queryResult: User[] = await BaseDatabase
        .connection(this.TABLE_USER)
        .select()
        .where({ email })

      return queryResult.length ? queryResult[0] : null
    } catch (error) {
      throw new Error(error.message || error.sqlMessage)
    }
  }

}
