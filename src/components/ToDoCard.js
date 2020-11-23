import React, { Component } from 'react'

export default class ToDoCard extends Component {
    state = {
        editToggle: false,
        name: this.props.item.name,
        priority: this.props.item.priority
    }

    handleEdit = () => {
        this.setState(prev => {
            return{
                editToggle: !prev.editToggle
            }
        })
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value 
        })

    }

    handleSubmit = (e, id) => {
        e.preventDefault()
        

        const editedToDo = {
            name: this.state.name,
            priority: this.state.priority
        }

        this.setState(prev => {
            return {
                editToggle: !prev.editToggle
            }
        })

        this.props.submitChanges(editedToDo, id)
    }

    render() {

        const {id, name, priority} = this.props.item

        return (
            <div id={id} className='ToDo-Card'>
            {
                this.state.editToggle ? 
                <React.Fragment>
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <input type='text' name='priority' value={this.state.priority} onChange={this.handleChange}/>
                </React.Fragment>
                :
                <p>{name}---{priority}</p>

            }
                <button type='button' onClick={() => this.props.handleDelete(id)}>X</button>

                {
                    this.state.editToggle ?
                    <button type='button' onClick={(e) => this.handleSubmit(e, id)}>Submit Changes</button>
                    :
                    <button type='button' onClick={this.handleEdit}>Edit Me</button>

                }
            </div>
        )
    }
}
