import Notification from "@/types/Notification";
import { PersonalInfoModuleState } from "./modules/PersonalInfo/state";
import { User as Auth0User } from "@auth0/auth0-spa-js/dist/typings/global";
import User from "@/types/User";
import { NFTModuleState } from "./modules/NFT/state";

export interface State {
  isSidebarMinimized: boolean;
  auth0User: Auth0User | null;
  user: User | null;
  isAuthenticated: any;
  isNewUser: boolean;
  customLoader: boolean;
  notification: Notification | null;

  PersonalInfo: PersonalInfoModuleState;
  NFT: NFTModuleState;
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
