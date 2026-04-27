import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: null
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      this.props.setAuth(res.data.token, username);
    } catch (err) {
      this.setState({
        error: err.response ? err.response.data.msg : 'Kayıt başarısız'
      });
    }
  };

  render() {
    const { username, email, password, error } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Kayıt Ol</h4>
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Kullanıcı Adı</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={this.onChange}
                    required
                  />
                </div>
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
                  Kayıt Ol
                </button>
              </form>
              <p className="text-center mt-3">
                Zaten hesabın var mı? <Link to="/login">Giriş yap</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
