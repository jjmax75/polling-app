import React from 'react';
import {Button, Panel, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

function PollAdd(props, context) {
  var instance = Object.create(React.Component.prototype);

  instance.props = props;
  instance.context = context;
  instance.state = {title: '', option1:'', option2: ''};

  instance.handleSubmit = function(e) {
    e.preventDefault();

    let newPoll = {
      title: instance.state.title,
      option1: instance.state.option1,
      option2: instance.state.option2
    }

    // instance.props.addPoll(newPoll); // TODO

    instance.setState({title: '', option1:'', option2: ''});
  }

  instance.handleTitleChange = (e) => {
    instance.setState({title: e.target.value});
  }

  instance.handleOption1Change = function(e) {
    instance.setState({option1: e.target.value});
  }

  instance.handleOption2Change = function(e) {
    instance.setState({option2: e.target.value});
  }

  instance.render = function() {
    return (
      <form className="pollAdd">
        <Panel>
          <FormGroup>
            <ControlLabel htmlFor="Title">Title</ControlLabel>
            <FormControl type="text" id="title" value={this.state.title} onChange={this.handleTitleChange}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="option1">Option 1</ControlLabel>
            <FormControl type="text" id="option1" value={this.state.option1} onChange={this.handleOption1Change}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="option2">Option 2</ControlLabel>
            <FormControl type="text" id="owner" value={this.state.option2} onChange={this.handleOption2Change}></FormControl>
          </FormGroup>
          <p><Button bsStyle="primary" onClick={this.handleSubmit}>Add Poll</Button></p>
        </Panel>
      </form>
    );
  };

  return instance;
}

export default PollAdd;
