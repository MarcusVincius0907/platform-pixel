import { PersonalInfoModuleModel } from "./modules/PersonalInfo";

export interface State {
    isSidebarMinimized: boolean;
    user: any;
    isAuthenticated: any;
    isNewUser: boolean;
    customLoader: boolean;
    PersonalInfo: PersonalInfoModuleModel;
}

export default class MainState implements State {

    constructor(){
        this.isSidebarMinimized = false;
        this.user = null;
        this.isAuthenticated = null;
        this.isNewUser = true;
        this.customLoader = false;
    }

    isSidebarMinimized: boolean;
    user: any;
    isAuthenticated: any;
    isNewUser: boolean;
    customLoader: boolean;
    PersonalInfo!: PersonalInfoModuleModel;
}