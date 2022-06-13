import { Auth0Plugin } from "@/auth";

export default class AuthService{
  constructor(private _auth: Auth0Plugin ){
    this.isAuthenticaded = this._auth.isAuthenticated.value
  }

  isAuthenticaded: boolean;
}