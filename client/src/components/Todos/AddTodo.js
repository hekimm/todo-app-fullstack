import React, { Component } from 'react';

class AddTodo extends Component {
  state = {
    text: ''
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text.trim()) return;
    this.props.addTodo(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Yeni görev ekle..."
          value={this.state.text}
          onChange={this.onChange}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">
            Ekle
          </button>
        </div>
      </form>
    );
  }
}

export default AddTodo;
