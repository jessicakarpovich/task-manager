import React, { Component } from 'react'
// import other components
import Header from './Header';
import TaskForm from './TaskForm';
import MainList from './MainList';


//import { Route } from "react-roter-dom";


class  MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            taskList: [],
            activeKey: '0'
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
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
    
    deleteTask(key) {
        let list = this.state.taskList;
        this.state.taskList.splice(key, 1);
        this.setState({ taskList: this.state.taskList});
        localStorage.setItem('taskList', JSON.stringify(list));
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
    
    render() {
        // map list values
        let tasks = this.state.taskList.map((value, key) => {
            return <MainList value={value} key={key} id={key} del={() => this.deleteTask(key)} />
        })
        
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        { !this.state.showForm &&
                        <button type="button" className="btn btn-primary my-2 mx-auto" onClick={this.toggleForm}>Add a New Task</button>}

                        {this.state.showForm && <TaskForm addTask={this.addTask} toggleForm={this.toggleForm}/>}
                    </div>
                    <div>
                        <div>{tasks}</div>
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
                <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.full.min.js"></script>
            </div>
        )
    }
}

export default MainContainer