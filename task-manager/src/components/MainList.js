import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';

class MainList extends Component {
    
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
                <CardBody className="py-0">
                    <UncontrolledCollapse toggler={name } >
                        <div className="xs-col d-md-flex pt-0 pb-1"> 
                            <CardText className="col-md-4">{this.props.value.desc}</CardText>
                            <CardText className="col-md-4"><strong>Hours</strong>: {this.props.value.hours}</CardText>
                            <div className="col-md-4">
                                <CardText><strong>Added:</strong> {this.props.value.added_date}</CardText>
                                <CardText><strong>Started:</strong></CardText>
                            </div>
                        </div>
                        <Button className="btn btn-danger mb-1" onClick={this.props.del}>Delete Task</Button>
                    </UncontrolledCollapse>
                </CardBody>
            </Card>
        )
    }
}

export default MainList