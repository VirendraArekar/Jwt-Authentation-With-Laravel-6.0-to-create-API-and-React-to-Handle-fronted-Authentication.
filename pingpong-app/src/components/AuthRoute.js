import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
// import cookie from "js-cookie"

const AuthRoute = ({ component: Component, ...rest }) => {
    // const token = cookie.get('token');
    return (
      <Route
      {...rest}
      render={props =>
        rest.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
    )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};
export default connect(mapStateToProps)(AuthRoute);
