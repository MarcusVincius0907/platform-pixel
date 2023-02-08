import { mainAction } from "./actions";
import PersonalInformationModule from "./modules/PersonalInfo/store";
import { mainMutations, MutationsType } from "./mutations";
import { mainState, State } from "./state";
import { MutationTree } from "vuex";

export default class MainStore {
  constructor() {
    this.strict = false;
    this.state = mainState;
    this.mutations = mainMutations;
    this.actions = mainAction;

    this.modules = {
      PersonalInfo: PersonalInformationModule,
    };
  }

  strict!: boolean;
  modules: any;
  state!: State;
  mutations: any;
  actions: any;
  getters: any;
}
