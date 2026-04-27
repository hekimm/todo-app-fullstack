import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      this.props.setAuth(res.data.token, res.data.username);
    } catch (err) {
      this.setState({
        error: err.response ? err.response.data.msg : 'Giriş başarısız'
      });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Giriş Yap</h4>
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Şifre</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Giriş Yap
                </button>
              </form>
              <p className="text-center mt-3">
                Hesabın yok mu? <Link to="/register">Kayıt ol</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
