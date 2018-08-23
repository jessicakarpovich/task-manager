import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false

        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="ml-5">
                <DropdownToggle caret>Filter Options</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.props.dateAsc}>Due Date Ascending</DropdownItem>
                    <DropdownItem onClick={this.props.dateDesc}>Due Date Descending</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.nameAsc}>Name Ascending</DropdownItem>
                    <DropdownItem onClick={this.props.nameDesc}>Name Descending</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.prioAsc}>Priority Ascending</DropdownItem>
                    <DropdownItem onClick={this.props.prioDesc}>Priority Descending</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
            );
      }
}

export default Dropdown;