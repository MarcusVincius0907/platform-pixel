import { Auth0Plugin, setupAuth } from '../auth'
import authConfig from '../../auth_config.json'
import router from '../router';
import app from '../main'

function callbackRedirect(appState: any) {
    router.push(
        appState && appState.targetUrl
        ? appState.targetUrl
        : '/dashboard'
    );
}


// SETUP AUTH URL
authConfig.redirect_uri = `http://localhost:8080/callback`

// switch(import.meta.env.MODE)
// {
//   case 'development': default: authConfig.redirect_uri = 'http://localhost:3000/callback'; break;
//   case 'staging': case 'production': authConfig.redirect_uri = 'https://rem-frontend-dev.vercel.app/callback'; break;
//   case 'production': authConfig.redirect_uri = 'https://rem-frontend.vercel.app/callback'; break;
// }

let useAuth: Auth0Plugin;

export function initAuth(){
    
    return new Promise((res, rej) => {
        setupAuth(authConfig, callbackRedirect).then((auth: any) => {
            useAuth = auth.useAuth
            res(auth.appObj)
        })
    })
}

export { useAuth };

