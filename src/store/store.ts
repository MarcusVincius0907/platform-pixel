import MainAction from "./actions";
import PersonalInformationModule from "./modules/PersonalInfo";
import MainMutation from "./mutations";
import MainState, { State } from "./state";

export default class MainStore {

    constructor(){
      this.strict = true;
      this.state = new MainState()
      this.mutations = new MainMutation();
      
  
      this.modules = {
        PersonalInfo: PersonalInformationModule
      }

      this.actions = new MainAction();
  
    }
  
    strict!: boolean;
    modules: any;
    state!: State;
    mutations: any;
    actions: any;
    getters: any;
    
  }