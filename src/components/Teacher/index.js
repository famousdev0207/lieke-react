import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Material UI
import {AppBar, IconButton, IconMenu, SelectField, MenuItem, Drawer, Dialog, FlatButton, TextField, ListItem, List, Avatar} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


//fetching
import axios from 'axios';

import CountUp from 'react-countup';

//Components

//Images
import TeacherImg from '../../images/teacher.jpg';


//Grid
import {Container, Row, Col} from 'react-grid-system'


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

//Slides
import SwipeableViews from 'react-swipeable-views';
import Pagination from './Pagination';

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
      index: 0,
      open: false,
      name: '',
      spots: [],
      games: [],
      adr: [],
      newRadius: '',
      groups: [
        {
          name: '',
          users: []
        }
      ],
      newUser: {
        email: ''
      },
      selectedGroup: 0,
      viewDisabled: true,
      myGroupsOpen: false,
      addGroupOpen: false,
      addStudentOpen: false,
      myGroupStudentsOpen: false,
      gameDialogOpen: false,
      showRadius: false,
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
          value: '',
          1: '',
          2: '',
          3: '',
          4: ''
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
    this.fetchMyGames();
    this.fetchGroups();
  }
  fetchMyGames() {
    console.log("mygames");
    let spots = [];
    let allgames = [];
    let that = this;
    axios.get("http://localhost:8000/api/v1/game")
    .then(function (response) {
      //console.log(response);
      let games = response.data.games;
      //console.log(games);
      Object.keys(games).forEach(function(key,index) {
        //console.log(games[key]);
        let coords = JSON.parse(games[key].coords);
        let game = games[key];
        game['coords'] = coords;
        
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
  fetchGroups() {
    console.log("get my groups");
    let that = this;
    axios.get("http://localhost:8000/api/v1/group")
    .then(function (response) {
      that.setState({
        groups: response.data.groups
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
        this.setState({
          coords: pos
        });
      });
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
  handleChangeGroup = (event, index, value) => this.setState({group_id: value});

  handleChangeOption = (name, option, event) => {
    let sentences = this.state.sentences;
    sentences[name.i][option] = event.target.value;
    this.setState({
      sentences: sentences
    });
  }
  handleChangeStudentEmail = (event) => {
    let newUser = this.state.newUser;
    newUser.email = event.target.value;
    this.setState({
      newUser: newUser
    });
  }
  handleChangeNewGroupName = (event) => {
    let newGroup = this.state.newGroup;
    newGroup.name = event.target.value;
    this.setState({
      newGroup: newGroup
    });
  }
  handleChangeNewGroupDesc = (event) => {
    let newGroup = this.state.newGroup;
    newGroup.desc = event.target.value;
    this.setState({
      newGroup: newGroup
    });
  }
  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeRadius = (event) => {
    this.setState({
      newRadius: event.target.value
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
    let index = this.state.index;
    index++;
    this.setState({
      sentences: sentences,
      index: index
    });
  };
  postGame = () => {
    let that = this;
    let name = this.state.name;
    let radius = this.state.newRadius;
    let group_id = this.state.group_id;
    let tasks = JSON.stringify(this.state.sentences);
    let spots = this.state.spots;
    let coords = spots[spots.length - 1];
    coords = JSON.stringify(coords);
    axios.post('http://localhost:8000/api/v1/game', {
      name: name,
      tasks: tasks,
      coords: coords,
      radius: radius,
      group_id: group_id
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
  addGroup = () => {
    let that = this;
    let name = this.state.newGroup.name;
    let desc = this.state.newGroup.desc;
    axios.post('http://localhost:8000/api/v1/group', {
      type: 'NEW_GROUP',
      name: name,
      desc: desc
    })
    .then(function (response) {
      console.log(response);
      that.fetchGroups();
    })
    .catch(function (error) {
      console.log(error);
    });
    this.handleAddGroupClose();
    this.setState({
      addSound: 'PLAYING'
    });
  }

  addStudent = () => {
    let that = this;
    let email = this.state.newUser.email;
    let group = this.state.groups[this.state.selectedGroup].id;
    axios.post('http://localhost:8000/api/v1/group', {
      type: 'NEW_USER',
      group_id: group,
      email: email
    })
    .then(function (response) {
      console.log(response);
      that.fetchGroups();
    })
    .catch(function (error) {
      console.log(error);
    });
    this.handleAddStudentClose();
    this.setState({
      addSound: 'PLAYING'
    });
  }

  setGroupSelected = (selectedRows) => {
      console.log(selectedRows);
      if(selectedRows.length >= 1) {
        this.setState({
            selectedGroup: selectedRows[0],
            viewDisabled: false
        });
      }
      else {
        this.setState({
            viewDisabled: true
        });
      }
      
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
  openGameModal = (index) => {
    this.setState({
      clickSound: 'PLAYING'
    });
    
    let currentGame = this.state.games[index];
    currentGame['tasks'] = JSON.parse(currentGame['tasks']);
    
    
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

  //My games dialog-------
  handleOpenMyGames = (index) => {
    this.setState({
      clickSound: 'PLAYING'
    });
    
    this.setState({
      myGamesOpen: true
    });
  };
  handleCloseMyGames = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      myGamesOpen: false,
    });
  };
  //--------------------------

  //My groups dialog-------
  handleOpenMyGroups = (index) => {
    this.fetchGroups();
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      myGroupsOpen: true
    });
  };
  handleCloseMyGroups = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      myGroupsOpen: false,
    });
  };

  //--------------------------
   //Ädd group dialog-------
  handleAddGroupOpen = (index) => {
    this.setState({
      clickSound: 'PLAYING'
    });
    
    this.setState({
      addGroupOpen: true
    });
  };
  handleAddGroupClose = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      addGroupOpen: false,
    });
  };
  //--------------------------
    //Ädd student dialog-------
  handleAddStudentOpen = (index) => {
    this.setState({
      clickSound: 'PLAYING'
    });
    
    this.setState({
      addStudentOpen: true
    });
  };
  handleAddStudentClose = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      addStudentOpen: false,
    });
  };
  //--------------------------
  //My group students dialog-------
  handleOpenMyGroupStudents = (index) => {
    //this.handleCloseMyGroups();
    //this.fetchGroups();
    console.log("open group students");
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      myGroupStudentsOpen: true
    });
  };
  handleCloseMyGroupStudents = () => {
    this.setState({
      clickSound: 'PLAYING'
    });
    this.setState({
      myGroupStudentsOpen: false,
      selectedGroup: 0
    });
  };
  //--------------------------

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
  
  componentDidMount(x,y,z) {
   this.setState({
    width: window.innerWidth+'px',
      height: window.innerHeight+'px'
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
        label="Close"
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
    const addGroupActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleAddGroupClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addGroup}
      />,
    ];
     const addStudentActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleAddStudentClose}
      />,
      <FlatButton
        label="Add student"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addStudent}
      />,
    ];
    const actionsMyGames = [
      <FlatButton
        label="Delete"
        disabled={true}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseMyGames}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseMyGames}
      />
    ];
    const actionsMyGroups = [
      <FlatButton
        label="View"
        primary={true}
        onTouchTap={this.handleOpenMyGroupStudents}
        disabled={this.state.viewDisabled}
      />,
      <FlatButton
        label="Add group"
        primary={true}
        onTouchTap={this.handleAddGroupOpen}
      />,
      <FlatButton
        label="Delete"
        disabled={true}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseMyGroups}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseMyGroups}
      />
    ];
     const actionsMyGroupStudents = [
      <FlatButton
        label="Add student"
        primary={true}
        onTouchTap={this.handleAddStudentOpen}
      />,
      <FlatButton
        label="Delete"
        disabled={true}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseMyGroupStudents}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseMyGroupStudents}
      />
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
          <Drawer open={true} containerClassName="menuSide">
            <div className="userInfo">
              <Avatar
                src={TeacherImg}
                size={150}
                className="avatar"
              />
              <h3 >Mr. Teacher</h3>
              <h1><CountUp start={0} end={743} /> </h1>
              <p className="score"> TEACHER POINTS </p>
            </div>
            <MenuItem className="menuItem" onClick={this.handleOpenMyGames}>My games</MenuItem>
            <MenuItem className="menuItem" onClick={this.handleOpenMyGroups}>My groups</MenuItem>
          </Drawer>
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
          <Dialog
            title="New Game"
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div className="answerInput">
              <TextField
                hintText="Game name"
                floatingLabelText="Name"
                value={this.state.name}
                onChange={this.handleChangeName}
              /><br/>
              <TextField
                hintText="Radius game is available"
                floatingLabelText="Radius (meters)"
                value={this.state.newRadius}
                onChange={this.handleChangeRadius}
              /><br />
              <SelectField
                floatingLabelText="Group"
                value={this.state.group_id}
                onChange={this.handleChangeGroup}
              >
                {this.state.groups.map((group, index) =>
                  <MenuItem value={group.id} key={index} primaryText={group.name} />
                )}
              </SelectField>
              <SwipeableViews enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex} disabled={true}>
              {this.state.sentences.map((sentence, i) => {
                return (
                      <div className="slideAddAnswer" key={i}>
                        <TextField
                          hintText="Sentence text"
                          key={i}
                          value={sentence.value}
                          floatingLabelText="Add sentence"
                          className="input"
                          onChange={this.handleChange.bind(this, {i})}
                        />
                        <TextField
                          hintText="Option 1"
                          value={sentence[1]}
                          floatingLabelText="Add answer option"
                          onChange={this.handleChangeOption.bind(this, {i}, 1)}
                        /><br />
                        <TextField
                          hintText="Option 1"
                          value={sentence[2]}
                          floatingLabelText="Add answer option"
                          onChange={this.handleChangeOption.bind(this, {i}, 2)}
                        /><br />
                        <TextField
                          hintText="Option 1"
                          value={sentence[3]}
                          floatingLabelText="Add answer option"
                          onChange={this.handleChangeOption.bind(this, {i}, 3)}
                        /><br />
                        <TextField
                          hintText="Option 1"
                          value={sentence[4]}
                          floatingLabelText="Add answer option"
                          onChange={this.handleChangeOption.bind(this, {i}, 4)}
                        /><br />
                      </div>
                );
              })}
              </SwipeableViews>
              <Pagination
                dots={this.state.sentences.length}
                index={this.state.index}
                onChangeIndex={this.handleChangeIndex}
              />
            </div>
          </Dialog>
          
          <Dialog
            title={this.state.currentGame.name}
            actions={actionsGameDialog}
            autoScrollBodyContent={true}
            modal={true}
            open={this.state.gameDialogOpen}
            onRequestClose={this.handleGameDialogClose}
          >
            <div>
              <List>
                {this.state.currentGame.tasks.map((task, index) =>
                  <ListItem key={index}
                    primaryText={task.value}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      <ListItem
                        key={1}
                        primaryText={task['1']}
                      />,
                      <ListItem
                        key={2}
                        primaryText={task['2']}
                      />,
                      <ListItem
                        key={3}
                        primaryText={task['3']}
                      />,
                      <ListItem
                        key={4}
                        primaryText={task['4']}
                      />,
                    ]}
                  />
                )}
              </List>
            </div>
          </Dialog>
          <Dialog
            title={"My Games"}
            actions={actionsMyGames}
            autoScrollBodyContent={true}
            modal={true}
            open={this.state.myGamesOpen}
            onRequestClose={this.handleCloseMyGames}
          >
            <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Location</TableHeaderColumn>
                      <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.state.games.map((game, index) =>
                      <TableRow key={index}>
                        <TableRowColumn>{game.name}</TableRowColumn>
                        <TableRowColumn>{this.state.adr[index]}</TableRowColumn>
                        <TableRowColumn>Active</TableRowColumn>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </Dialog>
          <Dialog
            title={"My groups"}
            actions={actionsMyGroups}
            autoScrollBodyContent={true}
            modal={true}
            open={this.state.myGroupsOpen}
            onRequestClose={this.handleCloseMyGroups}
          >
            <div>
                <Table onRowSelection={this.setGroupSelected}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Description</TableHeaderColumn>
                      <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody deselectOnClickaway={false}>
                    {this.state.groups.map((group, index) =>
                      <TableRow key={index} rowNumber={index}>
                        <TableRowColumn>{group.name}</TableRowColumn>
                        <TableRowColumn>{group.desc}</TableRowColumn>
                        <TableRowColumn>Active</TableRowColumn>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </Dialog>
          <Dialog
            title="New Group"
            actions={addGroupActions}
            modal={true}
            open={this.state.addGroupOpen}
            onRequestClose={this.handleAddGroupClose}
          >
            <div>
              <TextField
                hintText="New group name"
                floatingLabelText="Group name"
                value={this.state.newGroup.name}
                onChange={this.handleChangeNewGroupName}
              />
              <TextField
                hintText="New group description"
                floatingLabelText="Group description"
                value={this.state.newGroup.desc}
                fullWidth={true}
                onChange={this.handleChangeNewGroupDesc}
              />
              
             
            </div>
          </Dialog>
          <Dialog
            title={"Group students"}
            actions={actionsMyGroupStudents}
            autoScrollBodyContent={true}
            modal={true}
            open={this.state.myGroupStudentsOpen}
            onRequestClose={this.handleCloseMyGroupStudents}
          >
            <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Email</TableHeaderColumn>
                      <TableHeaderColumn>Added</TableHeaderColumn>
                      <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.state.groups[this.state.selectedGroup].users.map((user, index) =>
                      <TableRow key={index}>
                        <TableRowColumn>{user.name}</TableRowColumn>
                        <TableRowColumn>{user.email}</TableRowColumn>
                        <TableRowColumn>{user.created_at}</TableRowColumn>
                        <TableRowColumn>Active</TableRowColumn>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </Dialog>
          <Dialog
            title="Add Student"
            actions={addStudentActions}
            modal={true}
            open={this.state.addStudentOpen}
            onRequestClose={this.handleAddStudentClose}
          >
            <div>
              <TextField
                hintText="Student email"
                floatingLabelText="Email"
                value={this.state.newUser.email}
                onChange={this.handleChangeStudentEmail}
              />
           
            </div>
          </Dialog>
        </div>
       </MuiThemeProvider>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
