import Notification from "@/types/Notification";
import { PersonalInfoModuleState } from "./modules/PersonalInfo/state";
import { User as Auth0User } from "@auth0/auth0-spa-js/dist/typings/global";
import User from "@/types/User";
import { NFTModuleState } from "./modules/NFT/state";
import { SortitionModuleState } from "./modules/Sortition/state";
import { CartModuleState } from "./modules/Cart/state";
import { CheckoutModuleState } from "./modules/Checkout/state";

export interface State {
  isSidebarMinimized: boolean;
  auth0User: Auth0User | null;
  user: User | null;
  isAuthenticated: any;
  isNewUser: boolean;
  customLoader: boolean;
  notification: Notification | null;

  PersonalInfoModule: PersonalInfoModuleState;
  NFTModule: NFTModuleState;
  SortitionModule: SortitionModuleState;
  CartModule: CartModuleState;
  CheckoutModule: CheckoutModuleState;
}

export const mainState = {
  isSidebarMinimized: false,
  auth0User: null,
  user: null,
  isAuthenticated: null,
  isNewUser: true,
  customLoader: false,
  notification: null,
} as State;
