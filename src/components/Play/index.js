import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Material UI
import {IconButton, Dialog, FlatButton, Paper,  TextField, ListItem, List, Avatar} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


//fetching
import axios from 'axios';

import CountUp from 'react-countup';

//Components

//Images
import TeacherImg from '../../images/teacher.jpg';


//Grid
import {Container, Row, Col} from 'react-grid-system'

//Slides
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './Play.css';

//redux
import { connect } from 'react-redux';
//import { startShift } from '../../actions/shiftAction';
import { bindActionCreators } from 'redux';
import store from '../../store'

//Map
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

//Sounds
import Sound from 'react-sound';
import AddSound from '../../sounds/add.mp3';
import ClickSound from '../../sounds/click.mp3'



function mapStateToProps(state) {
  return {
    shift: state.shiftReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //startShift: (a) => { dispatch(startShift(a)) }
  }
}


const params = {v: '3.exp', key: 'AIzaSyBBx_UQLnVd3AW6TgYe_JdzwYPT8e6FUJI'};

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '500px',
      height: '500px',
      open: true,
      name: '',
      spots: [],
      playing: false,
      games: [
        {
          name: "",
          id: 0,
          name: "",
          tasks: [
            {
              value: ""
            }
          ],
          teacher_id: null,
          updated_at: "",
        }
      ],
      adr: [],
      index: 0,
      newRadius: '',
      groups: [
        {
          users: []
        }
      ],
      newUser: {
        email: 'max.prokopenko@hotmail.com'
      },
      showRadius: false,
      currentGame: {
        name: "",
        id: 0,
        name: "",
        tasks: [
          {
            value: ""
          }
        ],
        teacher_id: null,
        updated_at: "",
      },
      sentences: [
        {
          value: ''
        },
      ],
      coords: {
        lat: 51.5258541,
        lng: -0.08040660000006028
      },
      newGroup: {
        name: '',
        desc: '',
      },
      addSound: 'STOPPED',
      clickSound: 'STOPPED',
      myGamesOpen: false
    };
    this.fetchUser();
  }
  fetchUser() {
    console.log("fetching user");
    let that = this;
    axios.get("http://localhost:8000/api/v1/user")
    .then(function (response) {
      that.setState({
        user: response.data.user
      });
      console.log(response.data.user.groups[0].id);
      that.fetchMyGames(response.data.user.groups[0].id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  fetchMyGames(id) {
    console.log("mygames");
    let spots = [];
    let allgames = [];
    let that = this;
    axios.get("http://localhost:8000/api/v1/game/" + id)
    .then(function (response) {
      let games = response.data.games;
      //console.log(games);
      Object.keys(games).forEach(function(key,index) {
        //console.log(games[key]);
        let coords = JSON.parse(games[key].coords);
        let tasks = JSON.parse(games[key].tasks);
        let game = games[key];
        game['coords'] = coords;
        game['tasks'] = tasks;
        
        spots.push(coords);
        that.fetchAddress(coords.lat, coords.lng);
        allgames.push(game);

        //console.log(spots);
        that.setState({
          games: allgames,
          spots: spots
        });        
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  fetchAddress(lat, lng) {
    console.log("get address");
    let that = this;
    let addresses = this.state.adr;
    axios.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+','+lng)
    .then(function (response) {
      //console.log(response);
      addresses.push(response.data.results["0"].formatted_address);
      that.setState({
        adr: addresses
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: true
    });
    let that = this;
    const {Gmaps} = this.refs;

    Gmaps.getMap().setOptions({
      styles: [
                {
                    "stylers": [
                        {
                            "hue": "#007fff"
                        },
                        {
                            "saturation": 89
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
    });
    
    this.currentLocation();
  }

  currentLocation = () => {
     navigator.geolocation.getCurrentPosition(
        (position) => {},
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        //var lastPosition = JSON.stringify(position);
        //console.log(position);

        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("changed");
        this.setState({
          coords: pos
        });
        for (var i = 0; i < this.state.games.length; i++) {
          let lat1 = this.state.games[i].coords.lat;
          let lng1 = this.state.games[i].coords.lng;
          let lat2 = position.coords.latitude;
          let lng2 = position.coords.longitude;
          
          let dist = this.getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2);

          if (dist < this.state.games[i].radius) {
             let currentGame = this.state.games[i];
              this.setState({
                open: true,
                currentGame: currentGame,
              });
          }
        }
      });
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c * 1000; // Distance in m
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  handleChange = (name, event) => {
    let sentences = this.state.sentences;
    sentences[name.i].value = event.target.value;
    this.setState({
      sentences: sentences
    });
  }
  
  handleOpen = () => {
    this.setState({open: true});
    this.setState({
      clickSound: 'PLAYING'
    });
  };
  handleClose = () => {
    this.setState({open: false});
    this.setState({
      clickSound: 'PLAYING'
    });
  };

  handleCancel = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    let spots = this.state.spots;
    spots.splice(-1,1)
    this.setState({
      spots: spots
    });
    this.setState({open: false});
  };

  //Selected game dialog-------
  showRadius = (index) => {
    let currentGame = this.state.games[index];

    let radius = {
      radius: currentGame.radius,
      coords: currentGame.coords
    }
     this.setState({
        radius: radius,
        showRadius: true
     });
  }
 

  handleStopSound = (sound) => {
    let stop = {};
    stop[sound] = 'STOPPED'; 
    this.setState(stop);
  }

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  startGame = (id) => {
    console.log(this.state.currentGame);
    this.setState({
      open: false,
      playing: true
    });
  }


  answerClick = () => {
    let index = this.state.index;
    if(index < this.state.currentGame.tasks.length-1) {
      index++;
    }
    else {
      console.log("end of game");
      this.setState({
        playing: false
      });
    }
    this.setState({
      index: index
    });
  }

  componentDidMount(x,y,z) {
   this.setState({
    width: window.innerWidth+'px',
      height: window.innerHeight-48 +'px'
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { className, ...props } = this.props;

    const {
      index,
    } = this.state;

    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#0074a4',
        accent1Color: '#6AC0FF'
      }
    });

   const actions = [
      <FlatButton
        label="Not now"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Begin"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.startGame}
      />,
    ];
   
    let listSpots = this.state.spots.map((spot, index) =>
     <Marker
        lat={spot.lat}
        lng={spot.lng}
        key={index}
        draggable={false}
        onDragEnd={this.onDragEnd} 
        onClick={() => this.openGameModal(index)}
        onMouseOver={() => this.showRadius(index)}
        onMouseOut={() => this.setState({showRadius: false})}
      />
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div>
          <Sound
            url={AddSound}
            playStatus={this.state.addSound}
            onFinishedPlaying={() => this.handleStopSound('addSound')} 
          />
          <Sound
            url={ClickSound}
            playStatus={this.state.clickSound}
            onFinishedPlaying={() => this.handleStopSound('clickSound')} 
          />
          <Tabs>
            <Tab label="MAP" className="mapTab">
                  <Gmaps
                    params={params}
                    ref='Gmaps'
                    width={this.state.width}
                    height={this.state.height}
                    lat={this.state.coords.lat}
                    lng={this.state.coords.lng}
                    zoom={13}
                    loadingMessage={'Be happy'}
                    onMapCreated={this.onMapCreated}>
                    {listSpots}
                    <Marker
                      lat={this.state.coords.lat}
                      lng={this.state.coords.lng}
                      draggable={false}
                      clickable={false}
                    />
                    {this.state.showRadius && <Circle
                      lat={this.state.radius.coords.lat}
                      lng={this.state.radius.coords.lng}
                      radius={this.state.radius.radius}
                    /> }
                  </Gmaps>
                  {this.state.playing && <div className="root" style={{width: this.state.width}}>
                                      <SwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex} disabled={true}>
                                        {this.state.currentGame.tasks.map((task, index) =>
                                          <div className="slide" key={index}>
                                            <div className="task"> 
                                              {task.value}
                                            </div>
                                            <div className="answers">
                                                <Paper zDepth={1} className="answerBox" onClick={this.answerClick}>
                                                        <div>{task['1']}</div>
                                                </Paper>
                                                <Paper zDepth={1} className="answerBox" onClick={this.answerClick}>
                                                        <div>{task['2']}</div>
                                                </Paper>
                                                <Paper zDepth={1} className="answerBox" onClick={this.answerClick}>
                                                        <div>{task['3']}</div>
                                                </Paper>
                                                <Paper zDepth={1} className="answerBox" onClick={this.answerClick}>
                                                        <div>{task['4']}</div>
                                                </Paper>
                                            </div>
                                          </div>
                                         )}
                                      </SwipeableViews>
                    <Pagination
                      dots={this.state.currentGame.tasks.length}
                      index={index}
                      onChangeIndex={this.handleChangeIndex}
                    />
                  </div>}                  
            </Tab>
            <Tab label="GAMES" >
              <div>
  
              </div>
            </Tab>
            <Tab
              label="SETTINGS"
            >
              <div>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
          <Dialog
            title={"Game Nearby: " + this.state.currentGame.name }
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.state.currentGame.desc}
          </Dialog>
        </div>
       </MuiThemeProvider>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Play);
