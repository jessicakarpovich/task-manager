import React, { Component } from 'react'
// import other components
import Header from './Header';
import TaskForm from './TaskForm';


//import { Route } from "react-roter-dom";


class  MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            taskList: []
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        // load from local storage if there is anything
        if (localStorage.getItem('taskList') !== null) {
            let list = JSON.parse(localStorage.getItem('taskList'));
            this.setState({taskList: list});
        }
        
    }

    //handleCertainChange = (value) => {}
    // set state to new value

    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    }
    
    addTask(task) {
        this.state.taskList.push({
            name: task.name, 
            hours: task.hours, 
            desc: task.desc, 
            start_date: task.start_date,
            due_date: task.due_date
        });
        this.setState({ taskList: this.state.taskList });
        console.log(this.state.taskList);
        localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
    }

    render() {
        return (
            <div>
            <Header/>
                <div className="container">
                    <h2>Hello</h2>
                    <div className="row justify-content-center">
                        { !this.state.showForm &&
                        <button type="button" className="btn btn-primary" onClick={this.toggleForm}>Add a new task</button>}

                        {this.state.showForm && <TaskForm addTask={this.addTask} toggleForm={this.toggleForm}/>}
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
                <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            </div>
        )
    }
}

export default MainContainer