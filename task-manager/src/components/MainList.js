import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';

class MainList extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div eventKey={this.props.id}>
                <Card>
                    <CardBody id={this.props.value.name} className="d-flex justify-content-between align-items-center">
                        <div>
                        <CardTitle>{this.props.value.name}</CardTitle>
                        <CardText>{this.props.value.desc}</CardText>
                        </div>
                        <CardText>Hours: {this.props.value.hours}</CardText>
                        <CardText>Started: {this.props.value.start_date}</CardText>
                        <CardText>Due: {this.props.value.due_date}</CardText>
                        <Button className="my-2" >Expand</Button>
                    </CardBody>
                    <CardBody className="py-1">
                        <UncontrolledCollapse toggler={"#" + this.props.value.name }>
                            <CardText>Display sub-tasks</CardText>
                        </UncontrolledCollapse>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default MainList