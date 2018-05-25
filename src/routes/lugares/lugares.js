import React, { Component } from 'react';
import { Button, Header, Icon, Modal , Form,Accordion , Label,Popup,Grid} from 'semantic-ui-react'
import { Mutation,Query } from 'react-apollo'
import { withState } from 'recompose'
import { CREATE_LUGAR,GET_ALL_LUGARES} from '../../queries.js'


var markers = [];

function placeMarkerAndPanTo(latLng, map) {
   let marker = new window.google.maps.Marker({
     position: latLng,
     map: map
   });
   map.panTo(latLng);
   markers.push(marker);
 };

function clearMarkers(map) {
   for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
};

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}


const updateCache = (cache, { data: { createLugar } }) => {
  const { alllugares } = cache.readQuery({ query: GET_ALL_LUGARES})
  cache.writeQuery({
    query: GET_ALL_LUGARES,
    data: {
      alllugares: alllugares.concat(createLugar)
    }
  })
}



const styles={
  modalMap:{
    marginTop:'0px',
  },
}

const ModalExampleCloseIcon = () => (

  <Modal style={styles.modalMap} trigger={<Button circular color='green' icon='plus' />} closeIcon>
    <Modal.Header>Crea tu Lugar!</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <App />
      </Modal.Description>
    </Modal.Content>
  </Modal>

)

class App extends Component {

  static args={"index":"2dsphere","point":"Point"}

  constructor() {
      super();
      this.state = {
        zoom: 13,
        maptype: 'roadmap',
      };
    }

  componentDidMount() {

    this.args={'name':""}
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap',
    });

    let infoWindow = new window.google.maps.InfoWindow({map: map});

    map.addListener('click', function(e) {
      clearMarkers(null);
      placeMarkerAndPanTo(e.latLng, map);
      App.args['coordinates']=[parseFloat(e.latLng.lng()),parseFloat(e.latLng.lat())]
    });

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Usted esta Aqui!');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, this.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, this.map.getCenter());
        }
    }


  handleChange=(ev,input)=>{
    App.args[input.name]=input.value
    console.log(App.args);
  }


  optionsPrecio=[
    {'key':"FREE",'value':"FREE", 'text':"Gratis"},
    {'key':"INEXPENSIVE",'value':"INEXPENSIVE", 'text':"Barato"},
    {'key':"MODERATE",'value':"MODERATE", 'text':"Moderado"},
    {'key':"EXPENSIVE",'value':"EXPENSIVE", 'text':"Caro"},
    {'key':"VERY_EXPENSIVE",'value':"VERY_EXPENSIVE", 'text':"Muy Caro"},
    {'key':"UNKNOWN",'value':"UNKNOWN", 'text':"No Aplica"}
  ]


  render() {
    return (
      <div id='app'>
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={10}>
              <div id='map' />
            </Grid.Column>
            <Grid.Column width={6}>
              <Mutation mutation={CREATE_LUGAR} variables={App.args} update={updateCache}>
                {createLugar => (
                    <Form id="form"
                      onSubmit={async e => {
                        e.preventDefault();
                        await createLugar({variables:App.args});
                        eventFire(document.getElementsByClassName('close icon')[0], 'click');
                        this.args={}
                      }}
                      >
                      <Form.Group widths='equal'>
                        <Form.Input  name="nombre" onChange={this.handleChange} fluid label='Nombre' placeholder='Nombre' />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Select onChange={this.handleChange} fluid label='Nivel/precio' name='nivelPrecio' options={this.optionsPrecio} placeholder='Nivel/precio' />
                      </Form.Group>
                      <Button type='submit'>Crear</Button>
                    </Form>
                )}
              </Mutation>
            </Grid.Column>
        </Grid>


      </div>

    );
  }
};;

export default ModalExampleCloseIcon
