import React from 'react';

//MAterial Ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

//Counter
import CountUp from 'react-countup';

//Icons
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';


const GameCard = () => (
  <Paper className="studentCard" zDepth={1} >
   <div className="studentHeader">
     
     <h1 className="studentNum"> <CountUp start={0} end={3} /> </h1>
     <div className="mystudents">MY GAMES</div>
    </div>
    <div>
      <List>
        <ListItem
          primaryText="Game"
          leftAvatar={<GameIcon />}
        />
        <ListItem
          primaryText="Game"
          leftAvatar={<GameIcon />}
        />
        <ListItem
          primaryText="Game"
          leftAvatar={<GameIcon />}
        />
      </List>
    </div>
  </Paper>
);

export default GameCard;