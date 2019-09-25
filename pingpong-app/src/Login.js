import React,{ Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import cookie from "js-cookie"


class Login extends Component {
	constructor(props) {
	    super(props);
	    this.state = { email: "", password: "", errors: {} };
	  }

	handleForm = e => {
		e.preventDefault();
		const data = { email : this.state.email, password : this.state.password};
		axios.post("http://localhost:8000/api/auth/login",data)
		.then(res => {
			cookie.set("token", res.data.access_token);
			// cookie.set("user", res.data.user);
			// dispatch
			this.props.setLogin(res.data.user);
			this.props.history.push("/profile");
		})
		.catch(e => this.setState({ errors : e.response.data}));

	}

	handleInput = e => {
		e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
	}


	render() {
		const error = this.state.errors
		return (
				<div className="flex">
			      <div className="w-1/3" />
			        <div className="w-1/3 mt-10 p-4 bg-white">
			          <form className="border border-gray-500" onSubmit={this.handleForm}>
			            <div className="p-4">

			              <h1 className="text-lg border-b border-gray-500">Ping Here</h1>
			              <div className="mt-4">
											{ error.error? (<p className="text-red-500 text-sm">*{error.error}</p>) : ""}
			                <label>Email</label>
			                <input
			                  type="email"
			                  name="email"
			                  placeholder="Lovely Email"
			                  onChange={this.handleInput}
			                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
			                />
			              </div>
			              <div className="mt-4">
			                <label>Password</label>
			                <input
			                  type="password"
			                  name="password"
			                  onChange={this.handleInput}
			                  placeholder="Super Duper Secret Password"
			                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
			                />
			              </div>
			              <div className="mt-4">
			                <input
			                  type="submit"
			                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
			                />
			              </div>
			            </div>
			          </form>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps  = dispatch => {
	return {
		setLogin : user => dispatch({ type : 'SET_LOGIN', payload : user})
	};
};

export default connect(null, mapDispatchToProps)(Login);
