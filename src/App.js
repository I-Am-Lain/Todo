import logo from './logo.svg';
import './App.css';
import ToDoContainer from './components/ToDoContainer';
import React from 'react';
import ToDoForm from './components/ToDoForm';

class App extends React.Component {

  state = {
    myTodos: []
  }

  // json-server --watch db.json --port 3002
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
  componentDidMount(){
    fetch('http://localhost:3002/todos')
    .then(response => response.json())
    .then(json => 
      this.setState({
        myTodos: json
      })
    )
  }
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

  handleFormData = (formState) => {
    
    const configTodo = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formState)
    }

    fetch('http://localhost:3002/todos', configTodo)
    .then(resp => resp.json())
    .then(json => {
      this.setState(prevState => ({
        myTodos: [...prevState.myTodos, json]     // i was trying to .push into array, rather than do this....
      }))
      }
    )
  }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

  handleDelete = (id) => {
    fetch(`http://localhost:3002/todos/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(json => {
      console.log(`Deletion of ${id} was great success!`)

      const TodosAfterDelete = this.state.myTodos.filter(t => t.id !== id)

      this.setState({
        myTodos: TodosAfterDelete
      })
    })
  }
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

  submitChanges = (editedToDo, id) => {

    fetch(`http://localhost:3002/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(editedToDo)
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(`Editing of ${id} was great success!`)

      const newToDos = this.state.myTodos.map(t => {
        if (t.id ===json.id){
          return json
        } else return t
      })

      this.setState({
        myTodos: newToDos
      })
    })
  }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

         <ToDoContainer myTodos={this.state.myTodos} handleDelete={this.handleDelete} submitChanges={this.submitChanges}/>
         <ToDoForm handleFormData={this.handleFormData}/>
      </div>
    );
  }
}

export default App;
