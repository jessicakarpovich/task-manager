import React, { Component } from 'react'

class SubTaskForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            hours: 0,
            priority: 0,
            desc: '',
            loadedProps: false
        }
        
        this.addTask = this.addTask.bind(this);
        /*
        if (props.values !== undefined) {
            this.state.name = this.props.values.name;
            this.state.hours = this.props.values.hours;
            this.state.priority = this.props.values.priority;
            this.state.desc = this.props.values.desc;
        }*/
    }
    
    componentDidMount() {
        /** can be improved **/
        /* currently only re-renders on page reload, not on value state change */
        if (this.props.values !== undefined && this.state.loadedProps === false) {
            this.setState({name: this.props.values.name});
            this.setState({hours: this.props.values.hours});
            this.setState({priority: this.props.values.priority});
            this.setState({desc: this.props.values.desc});
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
        
        // validate user input
        if (this.state.name === undefined || this.state.name.trim() === "") {
            alert("Please do not leave the sub-task name blank.")
            return false;
        } 
        if (this.state.hours < 0 || isNaN(this.state.hours)) {
            alert("Please enter the number of hours this sub-task will take.")
            return false;
        }
        
        // keep description, start date and due date optional
        
        let task = {
            name: this.state.name, 
            hours: parseInt(this.state.hours, 10), 
            priority: parseInt(this.state.priority, 10),
            desc: this.state.desc
        };
        // send validated task to parent
        this.props.addSubTask(task);
        // toggle form
        this.props.toggleSubForm();
    }
    
    render () {
        return (
            <div className="col-md-6 my-2">
                <h2>Save Sub-Task</h2>
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
                    <div className="form-group d-flex justify-content-between">
                        <button className="btn btn-danger my-2" onClick={this.props.toggleSubForm}>Cancel</button>
                        <button className="btn btn-primary my-2" onClick={this.addTask}>Save</button>
                    </div>
                </form>
            </div>
        )
        
    }
}

export default SubTaskForm;