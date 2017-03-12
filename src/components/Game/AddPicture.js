import React from 'react';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
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
    
  render() {
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
  	console.log(this.state.screenshot);
    return (
    	<div>
   			{ !this.state.screenshot ? <Webcam id="camera" width='auto' height={220} audio={false} ref='webcam'/> : null }
   		
   			{ this.state.screenshot ? <img src={this.state.screenshot} /> : null }
   			<IconButton className="takeIcon"  iconStyle={styles.medium} onTouchTap={this.screenshot}>
		      {this.state.screenshot === null ? <CameraIcon /> : <AgainIcon/>}
		    </IconButton>
   		</div>
    );
  }
}

export default AddPicture;