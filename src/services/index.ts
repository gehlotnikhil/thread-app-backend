import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken"
const JWT_SECRET = "abc@123%xyz"
export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface getTokenPayload {
  email: string;
  password: string;
}

class UserService {
    public static generateHashPassword(salt:string,password:string){
        const hashPassword = createHmac("sha256", salt)
          .update(password)
          .digest("hex");
          return hashPassword;
      }
      public static async getUserById(id:string){
        if(!id) throw new Error("ID is undefined")
        const res = await prismaClient.user.findUnique({where:{id}})
        return res;
      }
      public static decodeToken(token:string){
        console.log("decode")
        return JWT.verify(token,JWT_SECRET);
      }
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    // database might not be able to read salt so we are
    // specifying it that it is hex thing
    const salt = randomBytes(32).toString("hex");
    const hashPassword = UserService.generateHashPassword(salt,password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        salt,
      },
    });
  }
 
  public static async getUserToken(payload: getTokenPayload) {
    const { email, password } = payload;
    const res = await prismaClient.user.findUnique({ where: { email } });
    if (!res) throw new Error("User not found");
    const salt = res.salt;
    const hashPassword = UserService.generateHashPassword(salt,password);
    if(hashPassword !== res.password) throw new Error("Password is incorrect");
    const token = JWT.sign({"email":email,"id":res.id},JWT_SECRET);
    return token;
  }
}
export default UserService;
