import React, { Component } from 'react'

export default class ToDoForm extends Component {

    state = {
        name: '',
        priority: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formObj = {
            name: this.state.name,
            priority: this.state.priority
        }

        this.props.handleFormData(formObj)
    }

    render() {
        return (
            <div className='ToDoForm'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>To Do: </label>
                    <input type='text' name='name' value={this.state.todo} onChange={this.handleChange}/>
                    <input type='text' name='priority' value={this.state.priority} onChange={this.handleChange} placeholder='Priority?...'/>
                    <button type='submit'>Hit me</button>
                </form>
            </div>
        )
    }
}
