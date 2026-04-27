import React, { Component } from 'react';
import axios from '../../axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

class TodoList extends Component {
  state = {
    todos: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos', {
        headers: { 'x-auth-token': this.props.token }
      });
      this.setState({ todos: res.data, loading: false });
    } catch (err) {
      this.setState({ error: 'Todolar yüklenemedi', loading: false });
    }
  };

  addTodo = async (text) => {
    try {
      const res = await axios.post(
        '/api/todos',
        { text },
        { headers: { 'x-auth-token': this.props.token } }
      );
      this.setState(prevState => ({
        todos: [res.data, ...prevState.todos]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  toggleTodo = async (id) => {
    try {
      const res = await axios.put(`/api/todos/${id}`, {}, {
        headers: { 'x-auth-token': this.props.token }
      });
      this.setState(prevState => ({
        todos: prevState.todos.map(todo =>
          todo._id === id ? res.data : todo
        )
      }));
    } catch (err) {
      console.error(err);
    }
  };

  deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { 'x-auth-token': this.props.token }
      });
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo._id !== id)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { todos, loading, error } = this.state;

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    const completed = todos.filter(t => t.completed).length;

    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h4 className="mb-3">
            Görevlerim{' '}
            <small className="text-muted">
              ({completed}/{todos.length} tamamlandı)
            </small>
          </h4>
          <AddTodo addTodo={this.addTodo} />
          {todos.length === 0 ? (
            <p className="text-muted mt-3">Henüz görev eklenmedi.</p>
          ) : (
            <ul className="list-group mt-3">
              {todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  toggleTodo={this.toggleTodo}
                  deleteTodo={this.deleteTodo}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default TodoList;
