import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Material UI
import {AppBar, IconButton, IconMenu, MenuItem, Drawer, Dialog, FlatButton, TextField, ListItem, List} from 'material-ui';

//fetching
import axios from 'axios';

//Components


//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './Teacher.css';

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

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '500px',
      height: '500px',
      open: false,
      name: '',
      spots: [],
      games: [],
      gameDialogOpen: false,
      currentGame: {
        name: "",
        id: null,
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
      addSound: 'STOPPED',
      clickSound: 'STOPPED'
    };
    this.fetchMyGames();
  }
  fetchMyGames() {
    console.log("mygames");
    let spots = [];
    let allgames = [];
    let that = this;
    axios.get("http://localhost:8000/api/v1/game")
    .then(function (response) {
      console.log(response);
      let games = response.data.games;
      console.log(games);
      Object.keys(games).forEach(function(key,index) {
        console.log(games[key]);
        let coords = JSON.parse(games[key].coords);
        let game = games[key];
        
        spots.push(coords);
        allgames.push(game);

        console.log(spots);
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
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        that.setState({
          coords: pos
        });
      }, function() {
        console.log("GPS ERROR");   
      });
    } else {
      console.log("GPS ERROR");
    }
  }
 
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }
 
  onCloseClick() {
    console.log('onCloseClick');
  }
 
  onClick = (e) => {
    let latitude = e.latLng.lat();
    let longitude = e.latLng.lng();
    let pos = {
          lat: latitude, 
          lng: longitude
    };
    console.log(pos);
    let spots = this.state.spots;
    spots.push(pos);
    this.setState({
      spots: spots
    });
    this.handleOpen();
  }
  handleChange = (name, event) => {
    let sentences = this.state.sentences;
    sentences[name.i].value = event.target.value;
    this.setState({
      sentences: sentences
    });
  }
  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  
  handleAdd = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    let sentences = this.state.sentences;
    let newSentence = {
      value: ''
    };
    sentences.push(newSentence);
    this.setState({
      sentences: sentences
    });
  };
  postGame = () => {
    let that = this;
    let name = this.state.name;
    let tasks = JSON.stringify(this.state.sentences);
    let spots = this.state.spots;
    let coords = spots[spots.length - 1];
    coords = JSON.stringify(coords);
    axios.post('http://localhost:8000/api/v1/game', {
      name: name,
      tasks: tasks,
      coords: coords
    })
    .then(function (response) {
      console.log(response);
      that.fetchMyGames();
      //that.postSpot(response.data.last_insert_id);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.handleClose();
    this.setState({
      addSound: 'PLAYING'
    });
  }

  // postSpot = (id) => {
  //   let spots = this.state.spots;
  //   let coords = spots[spots.length - 1];
  //   console.log(coords);
  //   coords = JSON.stringify(coords);
  //   axios.post('http://localhost:8000/api/v1/spot', {
  //     coords: coords,
  //     game_id: id
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   this.handleClose();
  // }
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
  openGameModal = (index) => {
    this.setState({
      clickSound: 'PLAYING'
    });
    console.log(index);
    let currentGame = this.state.games[index];
    currentGame['tasks'] = JSON.parse(currentGame['tasks']);

    console.log(currentGame);
    
    this.setState({
      currentGame: currentGame,
      gameDialogOpen: true
    });

    console.log(currentGame);
  };
  handleGameDialogClose = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    let currentGame = {
        name: "",
        id: null,
        name: "",
        tasks: [
          {
            value: ""
          }
        ],
        teacher_id: null,
        updated_at: "",
      };
    this.setState({
      gameDialogOpen: false,
      currentGame: currentGame
    });
  };
  //--------------------------

  handleStopSound = (sound) => {
    let stop = {};
    stop[sound] = 'STOPPED'; 
    this.setState(stop);
  }

  componentDidMount(x,y,z){
   this.setState({
    width: window.innerWidth+'px',
      height: window.innerHeight+'px'
    });
   
  }

  render() {
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    });
    const actions = [
      <FlatButton
        label="Add sentence"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAdd}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Publish"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.postGame}
      />,
    ];
    const actionsGameDialog = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleGameDialogClose}
      />  
    ];

    const styles = {
      
    };
    let listSpots = this.state.spots.map((spot, index) =>
     <Marker
        lat={spot.lat}
        lng={spot.lng}
        key={index}
        draggable={false}
        onDragEnd={this.onDragEnd} 
        onClick={() => this.openGameModal(index)}
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
          <Gmaps
            params={params}
            ref='Gmaps'
            width={this.state.width}
            height={this.state.height}
            lat={this.state.coords.lat}
            lng={this.state.coords.lng}
            zoom={13}
            loadingMessage={'Be happy'}
            onClick={this.onClick}
            onMapCreated={this.onMapCreated}>
            {listSpots}
          </Gmaps>
          <Dialog
            title="New Game"
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div>
              <TextField
                hintText="Game name"
                floatingLabelText="Name"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
              {this.state.sentences.map((sentence, i) => {
                return (
                    <TextField
                      hintText="Sentence text"
                      key={i}
                      value={sentence.value}
                      floatingLabelText="Add sentence"
                      className="input"
                      onChange={this.handleChange.bind(this, {i})}
                    />
                );
              })}
             
            </div>
          </Dialog>
          <Dialog
            title={this.state.currentGame.name}
            actions={actionsGameDialog}
            modal={true}
            open={this.state.gameDialogOpen}
            onRequestClose={this.handleGameDialogClose}
          >
            <div>
              <List>
                {this.state.currentGame.tasks.map((task, index) =>
                  <ListItem key={index}
                    primaryText={task.value} 
                  />
                )}
              </List>
            </div>
          </Dialog>
        </div>
       </MuiThemeProvider>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
