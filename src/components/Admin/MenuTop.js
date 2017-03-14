import React from 'react';

import CountUp from 'react-countup';

//Material UI elements
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

//Images
import TeacherImg from '../../images/teacher.jpg';


const MenuTop = () => (
   		<Paper zDepth={1} className="userCard">
		    <Avatar
	          src={TeacherImg}
	          size={150}
            className="avatar"
	        />
	        <h3 className="userName">Mr. Teacher</h3>
          <h1><CountUp start={0} end={743} redraw={true}/> </h1>
          <p className="score"> TEACHER POINTS </p>
		</Paper>
);

export default MenuTop;