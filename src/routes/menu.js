import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import Slider from "react-slick";
import Informacion from './perfil/informacion'
import EditarInformacion from './perfil/editarInformacion'
import {graphql,compose} from 'react-apollo';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';
import  { Redirect } from 'react-router-dom'


class MyMenu extends Component{
  render() {
    if (this.props.queryInformacion.loading) {
      return <div>Loading...</div>
    }
    const infoUsuario=this.props.queryInformacion.userById

    if(!sessionStorage.getItem('id'))
    {
      return <Redirect to='/login'/>
    }

  function handleClick(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  }
    return(
      <div class="ui vertical inverted left visible sidebar menu">

        <div class="div-image-logo-menu">
          <Image src="images/dop_logo_color.png" verticalAlign='middle' centered/>
        </div>


        <div class="div-image-profile-menu">

            <Image src={infoUsuario.picture} size='small' verticalAlign='middle' circular  centered/>

        </div>
          <a class="item" href="/">
            <i class="home icon"></i>
                Inicio
          </a>
          <a class="item" href="/perfil">
          <i class="settings icon"></i>
          Perfil
          </a>
          <a class="item" href="/amigos">
            <i class="users icon"></i>
            Amigos
          </a>
          <a class="item" href="/citas">
            <i class="hand victory icon"></i>
            Citas
          </a>

          <a class="item" href="/gustos">
            <i class="smile icon"></i>
            Gustos
          </a>
          <a class="item">
          <i class="chat icon"></i>
          Mensajes (Proximamente)
          </a>
          <a class="item" href="/match">
          <i class="like icon"></i>
          Encuentra personas!
          </a>
          <a class="item" href="#" onClick={handleClick}>
          <i class="like icon"></i>
          Cerrar session
          </a>
      </div>

    )
  }
}


const queryInformacion = gql`
query DetailView($id: Int!){
  userById(id: $id) {
    id,
    name
    picture
    age
    email
    gender
  }
}`
;

const queryOptions = {
  options: props => ({
    variables: {
      id: sessionStorage.getItem('id'),
    },
  }),
}
export default graphql(queryInformacion, {name: 'queryInformacion',options: props => ({ variables: { id: sessionStorage.getItem('id') }}) })(MyMenu);
