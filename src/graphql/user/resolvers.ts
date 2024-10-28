import UserService, { CreateUserPayload ,getTokenPayload} from "../../services"

const queries = {
    getUserToken:async(_:any,payload:getTokenPayload)=>{
        const res = UserService.getUserToken(payload);
        return res;
    }
}
const mutation = {
    createUser:async(_:any,payload:CreateUserPayload)=>{
        const res = await UserService.createUser(payload);
        return res.id; 
    }
}
export const resolvers = {queries,mutation}