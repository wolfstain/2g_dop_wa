import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import Slider from "react-slick";
import Informacion from './perfil/informacion'
import EditarInformacion from './perfil/editarInformacion'
import MyMenu from './menu'
import {USER_INFORMATION,UPDATE_USER,GET_PLEASURES} from  '../queries.js'
import editarInformacion from './perfil/editarInformacion'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import {graphql,compose} from 'react-apollo';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';


const styles={
  gridContent:{
    height:'100%',
    marginLeft:'0px',
    marginRight:'0px',
  },
  sidebar:{
    height:'100%',
  },
  divLogin:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
    padding:'25px',
  },
  columnPerfil:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
  },
  columnInformation:{
    /*backgroundColor:'#fff',*/
    color:'#fff',
  }
}

class Perfil extends Component{

  state={
    showInformacion:true,
    showEditarInformacion:false,
  }
  showEditarInformacion= (ev)=>{
      ev.preventDefault()
      this.setState({showInformacion:false,showEditarInformacion:true})
  }

  showInformacion= (ev)=>{
      ev.preventDefault()
      this.setState({showInformacion:true,showEditarInformacion:false})
  }

  render() {
    const {showInformacion,showEditarInformacion } = this.state;

    let {data} = this.props

    if (this.props.queryInformacion.loading || this.props.queryGustos.loading) {
      return <div>Loading...</div>
    }


    const infoUsuario=this.props.queryInformacion.userById
    const gustosUsuario=this.props.queryGustos.pleasureByUser

    return(

      <div id="contenido-principal">
        <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnInformation}>
              <h1>Usuario</h1>
              {showInformacion && <Informacion styles={styles} handleClick={this.showEditarInformacion} datosUsuario={infoUsuario} gustosUsuario={gustosUsuario}/>}
              {showEditarInformacion  && <EditarInformacion styles={styles} handleClick={this.showInformacion} id={infoUsuario.id} name={infoUsuario.name} email={infoUsuario.email} age={infoUsuario.age} gender={infoUsuario.gender} picture={infoUsuario.picture} password = {infoUsuario.password} />}
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


const queryOptions = {
  options: props => ({
    variables: {
      id: sessionStorage.getItem('id'),
    },
  }),
}


/*export default graphql(query, queryOptions)(Perfil);*/

export default compose(
  graphql(USER_INFORMATION, {name: 'queryInformacion',options: props => ({ variables: { id: sessionStorage.getItem('id') }}) }),
  graphql(GET_PLEASURES, {name: 'queryGustos', options: props => ({ variables: { user_id: sessionStorage.getItem('id') }}) }),
)(Perfil);
