import React from 'react'
import { graphql,compose } from 'react-apollo'
import gql from 'graphql-tag'
import {Label, Grid, Row, Col, Image, Button, Table,List,Header,Icon  } from'semantic-ui-react';
import { Link } from 'react-router-dom'
import MyMenu from './menu'
import {USER_INFORMATION,UPDATE_USER,GET_PLEASURES} from  '../queries.js'

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

class DetailView extends React.Component {
  render() {
    let {data} = this.props

    if (this.props.queryInformacion.loading || this.props.queryGustos.loading) {
      return <div>Loading...</div>
    }


    const infoUsuario=this.props.queryInformacion.userById
    const gustosUsuario=this.props.queryGustos.pleasureByUser
    return (
      <div id="contenido-principal">
        <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnPerfil}>
            <Image src={infoUsuario.picture} size='medium' circular centered/>
            </Grid.Column>

            <Grid.Column width={6} style={styles.columnInformation}>
            <Header as='h1' icon textAlign='center'>
                 <Icon textAlign='center' name='user' />
                 Perfil
                 <Header.Subheader>
                  Informacion de perfil
                 </Header.Subheader>
              </Header>
                <div class="subdiv-information">
                  <h2>Información basica</h2>
                  <List>
                    <List.Item>Nombre: {infoUsuario.name}</List.Item>
                    <List.Item>Correo: {infoUsuario.email}</List.Item>
                      <List.Item>Sexo: {infoUsuario.gender}</List.Item>
                    <List.Item>Edad: {infoUsuario.age}</List.Item>
                  </List>
                </div>
                <br/>
                <div class="subdiv-information">
                  <h2>Gustos</h2>
                  <List>

                    {gustosUsuario.map(gusto =>(
                      <List.Item>{gusto.name}</List.Item>
                    ))}

                  </List>
              </div>
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
      id: props.match.params.id,
    },
  }),
}
const queryOptions1 = {
  options: props => ({
    variables: {
      user_id: props.match.params.id,
    },
  }),
}
export default compose(
  graphql(USER_INFORMATION, {name: 'queryInformacion',options: props => ({ variables: { id: props.match.params.id }}) }),
  graphql(GET_PLEASURES, {name: 'queryGustos', options: props => ({ variables: { user_id: props.match.params.id }}) }),
)(DetailView);
