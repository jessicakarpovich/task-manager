import React, { Component } from 'react'
// import other components
import Header from './Header';
import TaskForm from './TaskForm';
import MainList from './MainList';
import Dropdown from './Dropdown';
import '../main.css';

// main container for task management
class  MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            taskList: [],
            activeKey: '0'
        }
        // bind
        this.toggleForm = this.toggleForm.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.filterDateAsc = this.filterDateAsc.bind(this);
        this.filterDateDesc = this.filterDateDesc.bind(this);
        this.filterNameAsc = this.filterNameAsc.bind(this);
        this.filterNameDesc = this.filterNameDesc.bind(this);
        this.filterPrioAsc = this.filterPrioAsc.bind(this);
        this.filterPrioDesc = this.filterPrioDesc.bind(this);
    }

    componentDidMount() {
        // load from local storage if there is anything
        if (localStorage.getItem('taskList') !== null) {
            let list = JSON.parse(localStorage.getItem('taskList'));
            this.setState({taskList: list});
        }
        
    }
    // toggle add task form
    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    }
    
    // push new task to task array and save in local storage
    addTask(task) {
        this.state.taskList.push({
            name: task.name, 
            hours: task.hours, 
            priority: task.priority,
            desc: task.desc, 
            added_date: task.added_date,
            start_date: task.start_date,
            due_date: task.due_date,
            subList: []
        });
        this.setState({ taskList: this.state.taskList });
        localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
    }
    
    // update task by id
    updateTask(value) {
        let list = this.state.taskList;
        list[value.id] = value.task;
        this.setState({ taskList: list});
        localStorage.setItem('taskList', JSON.stringify(list));
    }
    // delete task by key
    deleteTask(key) {
        let list = this.state.taskList;
        this.state.taskList.splice(key, 1);
        this.setState({ taskList: this.state.taskList});
        localStorage.setItem('taskList', JSON.stringify(list));
    }

    // handle what option from collapse is selected
    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
    /***** Filter functions *****/
    /*** Options: Due Date, Name, and Priority ***/
    /** Ascending and Descending **/
    filterDateAsc() {
        // filter for due date, oldest first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].due_date > list[j].due_date) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    filterDateDesc() {
        // filter for due date, newest first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].due_date < list[j].due_date) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    filterNameAsc() {
        // filter for name, a first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].name > list[j].name) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    filterNameDesc() {
        // filter for name, z first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].name < list[j].name) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    filterPrioAsc() {
        // filter for priority, lowest first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].priority > list[j].priority) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    filterPrioDesc() {
        // filter for priority, highest first
        let list = this.state.taskList;
        for (let i = 0; i < list.length; i++) {
            for (let j = i+1; j < list.length; j++) {
                if (list[i].priority < list[j].priority) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        this.setState({ taskList: list });
    }
    
    render() {
        // map list values
        let tasks = this.state.taskList.map((value, key) => {
            return <MainList value={value} key={key} id={key} del={() => this.deleteTask(key)} updateTask={(e) => this.updateTask(e)} lid={key}/>
        })
        
        return (
            <div>
                <Header/>
                <div className="container">
                    <div>
                        { !this.state.showForm &&
                        <div className="d-flex justify-content-around">
                            <button type="button" className="btn btn-primary my-2" onClick={this.toggleForm}>Add a New Task</button>
                            <Dropdown dateAsc={this.filterDateAsc} dateDesc={this.filterDateDesc} nameAsc={this.filterNameAsc} nameDesc={this.filterNameDesc} prioAsc={this.filterPrioAsc} prioDesc={this.filterPrioDesc} />
                        </div>}
                        <div className="d-flex justify-content-center">
                            {this.state.showForm && <TaskForm addTask={this.addTask} toggleForm={this.toggleForm}/>}
                        </div>  
                    </div>
                    <div className="scrollingContent">{tasks}</div>
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