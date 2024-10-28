import UserService, { CreateUserPayload ,getTokenPayload} from "../../services"

const queries = {
    getUserToken:async(_:any,payload:getTokenPayload)=>{
        const res = UserService.getUserToken(payload);
        return res;
    },
    getCurrentUser:async(_:any,parameter:any,context:any)=>{
        console.log("in",context)
        if(context && context.decodeToken){
            const user = await UserService.getUserById(context.decodeToken.id as string);
            console.log({"user":user})
            return user;
        }
        throw new Error("i don't know who you are")
    }
}
const mutation = {
    createUser:async(_:any,payload:CreateUserPayload)=>{
        const res = await UserService.createUser(payload);
        return res.id; 
    }
}
export const resolvers = {queries,mutation}