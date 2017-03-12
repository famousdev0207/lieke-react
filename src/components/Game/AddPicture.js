import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CameraIcon from 'material-ui/svg-icons/image/photo-camera';
import AgainIcon from 'material-ui/svg-icons/action/cached';


//Camera
import Webcam from 'react-webcam';

class AddPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      open: true,
    };
  }
  
  screenshot = () => {
  		if (this.state.screenshot === null) {
  			let screenshot = this.refs.webcam.getScreenshot();
	        this.setState({screenshot: screenshot});
  		}
  		else {
  			this.setState({screenshot: null});
  		}
	        
   }
  
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  }
      
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Done"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
  	const styles = {
  	  medium: {
  	    width: 30,
  	    height: 30,
  	    padding: '5px',
  	    borderRadius: '100%',
  	    color: '#fff',
  	    background: 'rgba(0,0,0,0.5)'
  	    
  	  },
  	};

    return (
    	<div>
   			
         <Dialog
          title="Take a picture"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{
            width: '100%',
            maxWidth: '450px',
            maxHeight: '100% !important'
          }}
          bodyStyle={{
             maxHeight: '100% !important'
          }}
          style={{
             paddingTop:'0 !important',
             marginTop:'-65px !important',
             bottom: '0 !important',
             overflow: 'scroll !important',
             height: 'auto !important'
          }}
        >
          <div>
            { !this.state.screenshot ? <Webcam id="camera" className="cameraDialog" audio={false} ref='webcam'/> : null }
            { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
          </div>
          <div>
            <IconButton className="takeIcon"  iconStyle={styles.medium} onTouchTap={this.screenshot}>
              {this.state.screenshot === null ? <CameraIcon /> : <AgainIcon/>}
            </IconButton>
          </div>
        </Dialog>
        { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
   		</div>
    );
  }
}

export default AddPicture;