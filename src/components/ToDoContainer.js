import React, { Component } from 'react'
import ToDoCard from './ToDoCard'

export default class ToDoContainer extends Component {
    render() {
        return (
            <div className='ToDoContainer'>
                {
                    this.props.myTodos.map(item => {
                        return <ToDoCard key={item.id} item={item} handleDelete={this.props.handleDelete} submitChanges={this.props.submitChanges}/>
                    })
                }
            </div>
        )
    }
}
