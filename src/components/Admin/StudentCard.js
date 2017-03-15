import React from 'react';

//MAterial Ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

//Counter
import CountUp from 'react-countup';
//Images
import UserImg from '../../images/max.jpg';
//Icons
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';


const StudentCard = () => (
  <Paper className="studentCard" zDepth={1} >
   <div className="studentHeader">
      
     <h1 className="studentNum"> <CountUp start={0} end={15} /> </h1>
     <div className="mystudents">MY STUDENTS</div>
    </div>
    <div>
      <List>
        <ListItem
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src={UserImg} />}
        />
        <ListItem
          primaryText="Eric Hoffman"
          leftAvatar={<Avatar src={UserImg} />}
        />
        <ListItem
          primaryText="Grace Ng"
          leftAvatar={<Avatar src={UserImg} />}
        />
        <ListItem
          primaryText="Kerem Suer"
          leftAvatar={<Avatar src={UserImg} />}
        />
        <ListItem
          primaryText="Raquel Parrado"
          leftAvatar={<Avatar src={UserImg} />}
        />
      </List>
    </div>
  </Paper>
);

export default StudentCard;