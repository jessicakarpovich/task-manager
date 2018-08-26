import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';
import SubTaskForm from './SubTaskForm';

// sub list items
class SubList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showSubForm: false,
            task: {
                name: props.value.name,
                hours: props.value.hours,
                priority: props.value.priority,
                desc: props.value.desc
            }
        }
        this.updateSubTask = this.updateSubTask.bind(this);
        this.toggleSubForm = this.toggleSubForm.bind(this);
        this.updateSubTask = this.updateSubTask.bind(this);
    }
    
    toggleSubForm() {
        this.setState({showSubForm: !this.state.showSubForm});
    }
    
    updateSubTask(task) {
        // issues with passing 2 arguments so use object to group them
        var value = {
            task: task,
            id: this.props.lid
        }
        // add trigger to main container
        this.props.updateSubTask(value);
    }
    
    render() {
        // make id a string so querySelector won't complain
        let id = "Id00" + this.props.lid;
        
        return (
            <Card>
                <CardBody id={id} className="xs-col d-md-flex justify-content-between align-content-center pt-1 pb-0">
                    <CardTitle className="col-md-4">{this.props.value.name}</CardTitle>
                    <CardText className="col-md-4"><strong>Priority:</strong> {this.props.value.priority}</CardText>
                    <CardText className="col-md-4"><strong>Expected Difficulty/Hours</strong>: {this.props.value.hours}</CardText>
                </CardBody>
                <CardBody className="pb-0">
                    <UncontrolledCollapse toggler={id } >
                        <div className="xs-col d-md-flex pt-0 pb-1"> 
                            <CardText className="col-md-8"><strong>Description:</strong> {this.props.value.desc}</CardText>
                        </div>
                        <div>
                            <Button className="btn btn-danger mb-1 mr-2" onClick={this.props.del}>Delete Sub-Task</Button>
                            { !this.state.showSubForm &&
                            <button type="button" className="btn btn-secondary mb-1 mr-2" onClick={this.toggleSubForm}>Edit Sub-Task</button>}
                        </div>
                        <div className="d-flex justify-content-center">
                            {this.state.showSubForm && <SubTaskForm toggleSubForm={this.toggleSubForm} addSubTask={this.updateSubTask} values={this.state.task}/>}
                        </div>
                    </UncontrolledCollapse>
                </CardBody>
            </Card>
        )
    }
}

export default SubList;