import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addTodo, deleteTodo} from '../ducks/todo'

class Todo extends Component {
  add = () => {
    this.props.addTodo('World')
  }

  delete = () => {
    this.props.deleteTodo('World')
  }

  // prettier-ignore
  render = () => (
    <div>
      {this.props.todos.map((todo, i) => (
        <div key={i}>{todo}</div>
      ))}

      <button onClick={this.add}>Add Now</button>
      <button onClick={this.delete}>Delete Now</button>
    </div>
  )
}

const mapStateToProps = state => ({
  todos: state.todo.todos,
})

export default connect(mapStateToProps, {addTodo, deleteTodo})(Todo)
