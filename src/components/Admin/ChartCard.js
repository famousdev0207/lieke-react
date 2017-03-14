import React from 'react';

//MAterial Ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

//Counter
import CountUp from 'react-countup';
import DonutChart from 'react-donut-chart';

//Icons
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset';


const ChartCard = () => (
  <Paper className="chartCard" zDepth={1} >
   <div class="studentHeader">
     <h1 className="studentNum"> <CountUp start={0} end={3} /> </h1>
     <div className="mystudents">MY GAMES</div>
    </div>
    <div className="chartBox">
        <DonutChart
          width={300}
          height={300}
          
          legend={false}
          data={[
            {
              label: 'Game1',
              value: 25
            },
            {
              label: 'Game2',
              value: 50
            },
            {
              label: 'Game3',
              value: 25 
            }
          ]} />
    </div>
  </Paper>
);

export default ChartCard;