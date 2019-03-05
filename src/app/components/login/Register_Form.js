import React from 'react';

// validate
import { checkEmail, checkPassword, checkMatch } from '../../utils/validate';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      loading: false,
      errors: {}
    };
  }

  _handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  _handleSubmit(event) {
    event.preventDefault();
    // validate data
    const ERRORS = { ...this.state.errors,
                    email: checkEmail(this.state.email),
                    password: checkPassword(this.state.password),
                    confirm: checkMatch(this.state.confirm, this.state.password, "Your password confirmation does not match")
                   };
    this.setState({
        errors: ERRORS
    });
    return ERRORS;
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <h6 className="text-muted">Sign up with your email address and password.</h6>
        <div className="form-group mt-4">
          <label>Email</label>
          <input type="email" name="email" className={"form-control" + (this.state.errors.email ? " is-invalid" : "")} placeholder="you@youremail.com" value={this.state.email} onChange={this._handleChange.bind(this)} />
          { this.state.errors.email ? <small className="invalid-feedback">{this.state.errors.email}</small> : false }
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className={"form-control" + (this.state.errors.password ? " is-invalid" : "")} value={this.state.password} onChange={this._handleChange.bind(this)} />
          { this.state.errors.password ? <small className="invalid-feedback">{this.state.errors.password}</small> : false }
        </div>
        <div className="form-group mb-4">
          <label>Confirm Password</label>
          <input type="password" name="confirm" className={"form-control" + (this.state.errors.confirm ? " is-invalid" : "")} value={this.state.confirm} onChange={this._handleChange.bind(this)} />
          { this.state.errors.confirm ? <small className="invalid-feedback">{this.state.errors.confirm}</small> : false }
        </div>
        <button type="submit" className="btn btn-primary btn-block">Create Account</button>
      </form>
    );
  }
}

export default RegisterForm;