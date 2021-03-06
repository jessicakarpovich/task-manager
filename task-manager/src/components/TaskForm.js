import React, { Component } from 'react'

// form for task, can have sub-tasks
class TaskForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            hours: 0,
            priority: 0,
            desc: '',
            start_date: '',
            due_date: '',
            loadedProps: false
        }
        
        this.addTask = this.addTask.bind(this);
    }
    
    componentDidMount() {
        /** can be improved **/
        /* currently only re-renders on page reload, not on value state change */
        if (this.props.values !== undefined && this.state.loadedProps === false) {
            this.setState({name: this.props.values.name});
            this.setState({hours: this.props.values.hours});
            this.setState({priority: this.props.values.priority});
            this.setState({desc: this.props.values.desc});
            this.setState({start_date: this.props.values.start_date});
            this.setState({due_date: this.props.values.due_date});
            if (this.props.values.subList) {
                this.setState({subList: this.props.values.subList});
            } else {
                this.setState({subList: []});
            }
            this.setState({loadedProps: true});
        }
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
        
        let added_date = new Date();
        // get it in yyyy/mm/dd format
        let temp = added_date.toISOString().slice(0, 10);
        
        // validate user input
        if (this.state.name === undefined || this.state.name.trim() === "") {
            alert("Please do not leave the task name blank.")
            return false;
        } 
        if (this.state.hours < 0 || isNaN(this.state.hours)) {
            alert("Please enter the number of hours this task will take.")
            return false;
        }
        
        // keep description, start date and due date optional
        // build task object
        let task = {
            name: this.state.name, 
            hours: parseInt(this.state.hours, 10), 
            priority: parseInt(this.state.priority, 10),
            desc: this.state.desc, 
            added_date: temp,
            start_date: this.state.start_date, 
            due_date: this.state.due_date,
            subList: this.state.subList
        };
        // send validated task to parent
        this.props.addTask(task);
        // toggle form
        this.props.toggleForm();
    }
    
    render () {
        return (
            <div className="col-md-6 my-2">
                <h2>Save Task</h2>
                <form>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name" className="col-form-label">Name:</label>
                            <input type="text" className="form-control" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="hours" className="col-form-label">Hours:</label>
                            <input type="number" className="form-control" id="hours" value={this.state.hours} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="col">
                            <label htmlFor="priority" className="col-form-label">Priority:</label>
                            <input type="number" className="form-control" id="priority" value={this.state.priority} onChange={(e) => this.handleInputChange(e)} />
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
                    <div className="form-group d-flex justify-content-between">
                        <button className="btn btn-danger my-2" onClick={this.props.toggleForm}>Cancel</button>
                        <button className="btn btn-primary my-2" onClick={this.addTask}>Save</button>
                    </div>
                </form>
            </div>
        )
        
    }
}

export default TaskForm;