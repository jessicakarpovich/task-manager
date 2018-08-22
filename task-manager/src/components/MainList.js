import React, { Component } from 'react'
import { UncontrolledCollapse, Button, CardBody, Card, CardTitle, CardText } from 'reactstrap';

class MainList extends Component {
    
    constructor(props) {
        super(props);
        //eventKey={this.props.id}
    }
    
    render() {
        // remove spaces from string so it can be used as id in toggling
        let name = this.props.value.name.replace(/\s/g, '');
        return (
            <div>
                <Card>
                    <CardBody id={name} className="xs-col d-md-flex justify-content-between align-items-center">
                        <div>
                            <CardTitle>{this.props.value.name}</CardTitle>
                            <CardText>{this.props.value.desc}</CardText>
                        </div>
                        <CardText className="my-2"><strong>Hours</strong>: {this.props.value.hours}</CardText>
                        <div className="xs-col">
                            <CardText className="my-2"><strong>Started:</strong> {this.props.value.start_date}</CardText>
                            <CardText><strong>Due:</strong> {this.props.value.due_date}</CardText>
                        </div>
                        <Button className="my-2" >Expand</Button>
                    </CardBody>
                    <CardBody className="py-1">
                        <UncontrolledCollapse toggler={name }>
                            <CardText>Display sub-tasks</CardText>
                            <Button className="btn btn-danger" onClick={this.props.del}>Delete Task</Button>
                        </UncontrolledCollapse>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default MainList