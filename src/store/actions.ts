/* import UserService from "@/services/userService"; */
import { Store } from "vuex";
import { MutationsType } from "./mutations";
import { State } from "./state";

export enum ActionTypes{
    CHECK_USER_EXISTS = 'CHECK_USER_EXISTS' 
}

export default class MainAction {

    async [ActionTypes.CHECK_USER_EXISTS](context: Store<State>){

        context.commit(MutationsType.SET_CUSTOM_LOADER, true);

        /* const userService: UserService =  new UserService();
        
        try{
            
            const resp = await userService.getUserByEmail(context.state.user.email);
            if(resp){
                context.commit(MutationsType.SET_IS_NEW_USER, true);
            }
        }catch(e){
            context.commit(MutationsType.SET_IS_NEW_USER, false);
            console.log(e);
        } */
        context.commit(MutationsType.SET_CUSTOM_LOADER, false);
    }
}