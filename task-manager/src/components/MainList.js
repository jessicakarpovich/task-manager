import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';
import TaskForm from './TaskForm';
import SubTaskForm from './SubTaskForm';
import SubList from './SubList';

// main task items, can have sublist
class MainList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            showSubForm: false,
            task: {
                name: props.value.name,
                hours: props.value.hours,
                priority: props.value.priority,
                desc: props.value.desc, 
                added_date: props.value.added_date,
                start_date: props.value.start_date, 
                due_date: props.value.due_date,
                subList: props.value.subList
            }
        }
        // bind
        this.toggleForm = this.toggleForm.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.toggleSubForm = this.toggleSubForm.bind(this);
        this.addSubTask = this.addSubTask.bind(this);
        this.updateSubTask = this.updateSubTask.bind(this);
    }
    
    //toggle edit form, make sure both forms aren't open at once
    toggleForm() {
        this.setState({showForm: !this.state.showForm});
        this.setState({showSubForm: false});
    }
    // toggle sub-task form
    toggleSubForm() {
        this.setState({showSubForm: !this.state.showSubForm});
        this.setState({showForm: false});
    }

    updateTask(task) {
        // issues with passing 2 arguments so use object to group them
        var value = {
            task: task,
            id: this.props.lid
        }
        // add trigger to main container
        this.props.updateTask(value);
    }
    
    addSubTask(task) {
        let mainTask = this.state.task;
        // check for undefined and set to empty array
        if (this.state.task.subList === undefined) {
            this.setState({task: {subList: []}});
            mainTask.subList = [];
        }
        // push new values
        mainTask.subList.push({
            name: task.name, 
            hours: task.hours, 
            priority: task.priority,
            desc: task.desc
        });
        // update state
        this.setState({ task: mainTask });
        // use object to group values
        var value = {
            task: mainTask,
            id: this.props.lid
        }
        // add trigger to main container
        this.props.updateTask(value);
    }
    
    updateSubTask(value) {
        // grab current sub list
        let list = this.state.task.subList;
        // update the value based on id
        list[value.id] = value.task;
        this.setState({ task: { subList: list}});
        
        // use object to group task and id
        var task = {
            task: this.state.task,
            id: this.props.lid
        }
        // add trigger to main container
        this.props.updateTask(task);
    }
    // remove sub task
    deleteSubTask(key) {
        let mainTask = this.state.task;
        mainTask.subList.splice(key, 1);
        this.setState({ task: mainTask });
        // use object to group values
        var value = {
            task: mainTask,
            id: this.props.lid
        }
        this.props.updateTask(value);
    }
    
    render() {
        // make id a string so querySelector won't complain
        let id = "Id" + this.props.lid;
        // map list values for subtasks
        let tasks = [];
        if (this.state.task.subList !== undefined) {
            tasks = this.state.task.subList.map((value, key) => {
                return <SubList value={value} key={key} id={key} lid={key} del={() => this.deleteSubTask(key)} updateSubTask={(e) => this.updateSubTask(e)} />
            })
        }
        
        return (
            <Card>
                <CardBody id={id} className="xs-col d-md-flex justify-content-between align-content-center pt-1 pb-0">
                    <CardTitle className="col-md-4">{this.props.value.name}</CardTitle>
                    <CardText className="col-md-4"><strong>Priority:</strong> {this.props.value.priority}</CardText>
                    <CardText className="col-md-4"><strong>Due Date:</strong> {this.props.value.due_date}</CardText>
                </CardBody>
                <CardBody className="pb-0">
                    <UncontrolledCollapse toggler={"#" + id } >
                        <div className="xs-col d-md-flex pt-0 pb-1"> 
                            <CardText className="col-md-4"><strong>Description:</strong> {this.props.value.desc}</CardText>
                            <CardText className="col-md-4"><strong>Expected Difficulty/Hours</strong>: {this.props.value.hours}</CardText>
                            <div className="col-md-4">
                                <CardText><strong>Added:</strong> {this.props.value.added_date}</CardText>
                                <CardText><strong>Started:</strong> {this.props.value.start_date}</CardText>
                            </div>
                        </div>
                        <div>
                            <Button className="btn btn-danger mb-1 mr-2" onClick={this.props.del}>Delete Task</Button>
                            { !this.state.showForm &&
                            <button type="button" className="btn btn-secondary mb-1 mr-2" onClick={this.toggleForm}>Edit Task</button>}
            
                            { !this.state.showSubForm && <button type="button" className="btn btn-primary mb-1" onClick={this.toggleSubForm}>Add Sub-Task</button> }
                        </div>
                        <div className="d-flex justify-content-center">
                            {this.state.showForm && <TaskForm addTask={this.updateTask} toggleForm={this.toggleForm} values={this.state.task} />}
            
                            {this.state.showSubForm && <SubTaskForm addSubTask={this.addSubTask} toggleSubForm={this.toggleSubForm} />}
                        </div>
                        <div className="mx-2">{ tasks }</div>
                    </UncontrolledCollapse>
                </CardBody>
            </Card>
        )
    }
}

export default MainList