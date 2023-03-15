import { mainAction } from "./actions";
import CartModule from "./modules/Cart/store";
import NFTModule from "./modules/NFT/store";
import PersonalInformationModule from "./modules/PersonalInfo/store";
import SortitionModule from "./modules/Sortition/store";
import { mainMutations } from "./mutations";
import { mainState, State } from "./state";

export default class MainStore {
  constructor() {
    this.strict = false;
    this.state = mainState;
    this.mutations = mainMutations;
    this.actions = mainAction;

    this.modules = {
      PersonalInfoModule: PersonalInformationModule,
      NFTModule: NFTModule,
      SortitionModule: SortitionModule,
      CartModule: CartModule,
    };
  }

  strict!: boolean;
  modules: any;
  state!: State;
  mutations: any;
  actions: any;
  getters: any;
}
