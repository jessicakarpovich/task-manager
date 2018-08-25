import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';
import TaskForm from './TaskForm';

class MainList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            subList: [],
            activeKey: '0',
            task: {
                name: props.value.name,
                hours: props.value.hours,
                priority: props.value.priority,
                desc: props.value.desc, 
                added_date: props.value.added_date,
                start_date: props.value.start_date, 
                due_date: props.value.due_date
            }
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }
    
    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    }
    
    updateTask(task) {
        // add trigger to main container
        this.props.updateTask(task, this.props.id);
    }
    
    render() {
        // remove spaces from string so it can be used as id in toggling
        let name = this.props.value.name.replace(/\s/g, '');
        return (
            <Card>
                <CardBody id={name} className="xs-col d-md-flex justify-content-between align-content-center pt-1 pb-0">
                    <CardTitle className="col-md-4">{this.props.value.name}</CardTitle>
                    <CardText className="col-md-4"><strong>Priority:</strong> {this.props.value.priority}</CardText>
                    <CardText className="col-md-4"><strong>Due Date:</strong> {this.props.value.due_date}</CardText>
                </CardBody>
                <CardBody className="pb-0">
                    <UncontrolledCollapse toggler={name } >
                        <div className="xs-col d-md-flex pt-0 pb-1"> 
                            <CardText className="col-md-4"><strong>Description:</strong> {this.props.value.desc}</CardText>
                            <CardText className="col-md-4"><strong>Expected Difficulty/Hours</strong>: {this.props.value.hours}</CardText>
                            <div className="col-md-4">
                                <CardText><strong>Added:</strong> {this.props.value.added_date}</CardText>
                                <CardText><strong>Started:</strong></CardText>
                            </div>
                        </div>
                        <div>
                            <Button className="btn btn-danger mb-1 mr-2" onClick={this.props.del}>Delete Task</Button>
                            { !this.state.showForm &&
                            <button type="button" className="btn btn-secondary mb-1" onClick={this.toggleForm}>Edit Task</button>}
                        </div>
                        <div className="d-flex justify-content-center">
                            {this.state.showForm && <TaskForm addTask={this.updateTask} toggleForm={this.toggleForm} values={this.state.task} />}
                        </div>
                    </UncontrolledCollapse>
                </CardBody>
            </Card>
        )
    }
}

export default MainList