import React, { Component } from 'react'

class TaskForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            hours: 0,
            desc: '',
            start_date: '',
            due_date: ''
        }
        
        this.addTask = this.addTask.bind(this);
    }
    
    // function to handle input change
    // name of input field is set to its id
    // that name is later used to modify the correct state
    handleInputChange(e) {
        let name = e.target.id;
        let value = e.target.value;
        this.setState({[name]: value});
    }
    
    addTask(e) {
        e.preventDefault();
        
        // create regex to use for date validation
        // format yyyy/mm/dd
        let dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        
        // validate user input
        if (this.state.name === undefined || this.state.name.trim() === "") {
            alert("Please do not leave the task name blank.")
            return false;
        } 
        if (this.state.hours < 0 || isNaN(this.state.hours)) {
            alert("Please enter the number of hours this task will take.")
            return false;
        }
        if (this.state.desc === undefined || this.state.desc.trim() === "") {
            alert("Please enter a description for the task.")
            return false;
        }
        if (!(dateRegex.test(this.state.start_date))) {
            alert("Please enter a valid start date.");
            return false;
        }
        if (!(dateRegex.test(this.state.due_date)) || this.state.start_date > this.state.due_date) {
            alert("Please enter a valid due date.");
            return false;
        }
        let task = {
            name: this.state.name, 
            hours: parseInt(this.state.hours), 
            desc: this.state.desc, start_date: 
            this.state.start_date, 
            due_date: this.state.due_date
        };
        // send validated task to parent
        this.props.addTask(task);
        // toggle form
        this.props.toggleForm();
    }
    
    render () {
        return (
            <div className="col-md-6">
                <form>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name" className="col-form-label">Name:</label>
                            <input type="text" className="form-control" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="col">
                            <label htmlFor="hours" className="col-form-label">Hours:</label>
                            <input type="number" className="form-control" id="hours" value={this.state.hours} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc" className="col-form-label">Description:</label>
                        <textarea className="form-control" id="desc" value={this.state.desc} onChange={(e) => this.handleInputChange(e)}></textarea>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="start_date" className="col-form-label">Start Date:</label>
                            <input type="date" className="form-control" id="start_date" value={this.state.start_date} onChange={(e) => this.handleInputChange(e)}/>
                        </div>
                        <div className="col">
                            <label htmlFor="due_date" className="col-form-label">Due Date:</label>
                            <input type="date" className="form-control" id="due_date" value={this.state.due_date} onChange={(e) => this.handleInputChange(e)}/>
                        </div>
                    </div>
                    <button className="btn btn-primary my-2" type="submit" onClick={this.addTask}>Save</button>
                </form>
            </div>
        )
        
    }
}

export default TaskForm;