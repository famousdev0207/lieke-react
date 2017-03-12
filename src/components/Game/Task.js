import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';


//Components
import AddPicture from './AddPicture';

//Images
import UserImg from '../../images/max.jpg';

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



class Task extends React.Component {
	
   state = {
      finished: false,
      stepIndex: 0,
    };

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

      return (
        <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Instructions</StepLabel>
              <StepContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna justo, fermentum at mauris at, 
                  tempus maximus lorem. Integer eu egestas ipsum. Curabitur sed libero quis turpis sagittis faucibus
                  id in quam. Nulla facilisi. Integer nisl quam, facilisis ac eleifend quis, varius et ex.
                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Take a picture</StepLabel>
              <StepContent>
                <AddPicture /> 
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Fill up sentences</StepLabel>
              <StepContent>
                <p>
                  Lorem ipsum dolor sit amet, _________ adipiscing elit. Ut urna justo, _________ at mauris at, 
                  tempus maximus lorem. Integer eu egestas ipsum. Curabitur sed libero quis turpis sagittis faucibus
                  id in quam. Nulla _________. Integer nisl quam, _________ ac eleifend quis, varius et ex.
                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
          {finished && (
            <p style={{margin: '20px 0', textAlign: 'center'}}>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          )}
        </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);