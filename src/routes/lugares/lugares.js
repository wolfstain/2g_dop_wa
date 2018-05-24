import React, { Component } from 'react';
import { Button, Header, Icon, Modal , Form,Accordion , Label,Popup} from 'semantic-ui-react'
import { Mutation,Query } from 'react-apollo'
import { withState } from 'recompose'
import { CREATE_LUGAR} from '../../queries.js'


var markers = [];

function placeMarkerAndPanTo(latLng, map) {
   let marker = new window.google.maps.Marker({
     position: latLng,
     map: map
   });
   map.panTo(latLng);
   markers.push(marker);
 }

function clearMarkers(map) {
   for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}


export default class App extends Component {

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

    map.addListener('click', function(e) {
      clearMarkers(null);
      placeMarkerAndPanTo(e.latLng, map);
      App.args['coordinates']=[parseFloat(e.latLng.lng()),parseFloat(e.latLng.lat())]
    });
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
        <div id='map' />
          <Mutation mutation={CREATE_LUGAR} variables={App.args}>
            {createLugar => (
                <Form id="form"
                  onSubmit={async e => {
                    e.preventDefault();
                    await createLugar({variables:App.args});
                    this.args={}
                  }}
                  >
                  <Form.Group widths='equal'>
                    <Form.Input  name="nombre" onChange={this.handleChange} fluid label='Nombre' placeholder='Nombre' />
                    <Form.Select onChange={this.handleChange} fluid label='Nivel/precio' name='nivelPrecio' options={this.optionsPrecio} placeholder='Nivel/precio' />
                  </Form.Group>
                  <Button type='submit'>Crear</Button>
                </Form>
            )}
          </Mutation>
      </div>

    );
  }
};;
