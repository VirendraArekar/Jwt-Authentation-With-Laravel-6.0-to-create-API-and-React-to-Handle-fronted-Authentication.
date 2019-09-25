import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index'
import { Provider } from 'react-redux'
import axios from 'axios'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const jwt_secret = 'HBuL8FE570JGBoR3vkssggvqMC55IihchgEtSepIVEmTr3uYvwiE6O9hzCjkcZZv';

let token = cookie.get("token");


// verify a token symmetric
if(token){
  jwt.verify(token, jwt_secret, function(err, decoded) {
    if(err){
      cookie.remove("token");
      token  = null;
    }
    // else{
    //    if(decoded.iss !== 'http://localhost/api/auth/login'){
    //      cookie.remove("token");
    //      token  = null;
    //    }
    // }
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
};

if(token){
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.post("http://localhost:8000/api/auth/me").then(res => {
      store.dispatch({ type: "SET_LOGIN", payload: res.data });
    });
  render();
}
else{
  render();
}




serviceWorker.unregister();
