import { mainAction } from "./actions";
import NFTModule from "./modules/NFT/store";
import PersonalInformationModule from "./modules/PersonalInfo/store";
import { mainMutations } from "./mutations";
import { mainState, State } from "./state";

export default class MainStore {
  constructor() {
    this.strict = false;
    this.state = mainState;
    this.mutations = mainMutations;
    this.actions = mainAction;

    this.modules = {
      PersonalInfo: PersonalInformationModule,
      NFT: NFTModule
    };
  }

  strict!: boolean;
  modules: any;
  state!: State;
  mutations: any;
  actions: any;
  getters: any;
}
