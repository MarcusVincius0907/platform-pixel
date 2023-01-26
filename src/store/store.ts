import PersonalInformationModule from "./modules/PersonalInfo";
import MainMutations from "./mutations";
import MainState, { State } from "./state";

export default class MainStore {

    constructor(){
      this.strict = true;
      this.state = new MainState()
      this.mutations = new MainMutations();
  
      this.modules = {
        PersonalInfo: PersonalInformationModule
      }
  
    }
  
    strict!: boolean;
    modules: any;
    state!: State;
    mutations: any;
    actions: any;
    getters: any;
    
  }