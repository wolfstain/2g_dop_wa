import React, { Component } from 'react';
import { Button, Header, Icon, Modal , Form,Accordion , Label,Popup} from 'semantic-ui-react'
import { Mutation,Query } from 'react-apollo'
import { withState } from 'recompose'
import { CREATE_LUGAR} from '../../queries.js'


function placeMarkerAndPanTo(latLng, map) {
   let marker = new window.google.maps.Marker({
     position: latLng,
     map: map
   });
   map.panTo(latLng);
 };

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
};


const styles={
  modalMap:{
    marginTop:'0px',
  },
}


const ModalViewLugar = ({latlng}) => {
  return(
    <Modal style={styles.modalMap} trigger={<Button circular color='blue' icon='write' />}>
      <Modal.Header>Editar gusto</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <ViewLugar latlng={latlng} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}


class ViewLugar extends Component {

  constructor(props) {
      super(props);
      this.state = {
        zoom: 13,
        maptype: 'roadmap',
      };
      this.latlng=this.props.latlng;
    }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      mapTypeId: 'roadmap',
    });

    let infoWindow = new window.google.maps.InfoWindow({map: map});
    console.log(this.latlng);

    map.addListener('click', function(e) {
      console.log(e.latLng);
    });

    placeMarkerAndPanTo(this.latlng,map);

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
          handleLocationError(false, infoWindow, this.map.getCenter());
        }
    }

  render() {
    return (
      <div id='app'>
        <div id='map' />
      </div>
    );
  }
};;

export default ModalViewLugar;
