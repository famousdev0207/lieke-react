import React from 'react';
import { browserHistory } from 'react-router';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

//Components

//Images


//redux
import { connect } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { bindActionCreators } from 'redux';
import store from '../../store'



function mapStateToProps(state) {
  return {
    user: state.userReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //userLogin: (a) => { dispatch(userLogin(a)) }
  }
}



class NewGame extends React.Component {
	
   state = {
      finished: false,
      stepIndex: 0, //set to 2 sentences for development
      value: null,
      task: ""
    };
    handleChange = (event, index, value) => this.setState({value});

    handleChangeTask(event) {
      this.setState({task: event.target.value});
    }
    handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
      
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    };
    renderStepActions(step) {
      const {stepIndex} = this.state;

      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />
          {step > 0 && (
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />
          )}
        </div>
      );
    }
    
    render() {
      const {finished, stepIndex} = this.state;
      const items = [
        <MenuItem key={1} value={1} primaryText="None" />,
        <MenuItem key={2} value={2} primaryText="Photo" />,
        <MenuItem key={3} value={3} primaryText="Video" />,
      ];
      return (
        <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Instructions</StepLabel>
              <StepContent>
                
                  <TextField
                    hintText="Add good instructions for your game"
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                  />
                
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Answer type</StepLabel>
              <StepContent>
                <SelectField
                  value={this.state.value}
                  onChange={this.handleChange}
                  floatingLabelText="Answer type"
                >
                  {items}
                </SelectField>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Add sentences</StepLabel>
              <StepContent>
               
                 <TextField
                    hintText="Add your text for a game. Put *aukko* at place of missing world"
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    value={this.state.task} 
                    onChange={this.handleChangeTask}
                  />
               
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);