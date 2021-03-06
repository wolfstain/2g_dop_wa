import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';


export default({styles, handleClick, datosUsuario , gustosUsuario})=>{
    return(
      <div>
      <Header as='h1' icon textAlign='center'>
           <Icon name='user' />
           Perfil
           <Header.Subheader>
            Informacion de perfil
           </Header.Subheader>
        </Header>
          <div class="subdiv-information">
              <Grid.Column width={6} style={styles.columnPerfil}>
                <Image src={datosUsuario.picture} size='small' circular centered/>
              </Grid.Column>

              <Grid.Column width={6} style={styles.columnInformation}>
                <h2>Información basica</h2>

                <List>
                  <List.Item>Nombre: {datosUsuario.name}</List.Item>
                  <List.Item>Correo: {datosUsuario.email}</List.Item>
                    <List.Item>Sexo: {datosUsuario.gender}</List.Item>
                  <List.Item>Edad: {datosUsuario.age}</List.Item>
                </List>
                <div class="div-buttonsInfo">
                   <Button onClick={handleClick}circular color='blue' icon='write' />
                </div>
                </Grid.Column>
              </div>
              <div class="subdiv-information">
                 <h2>Gustos</h2>
                  <List>

                    {gustosUsuario.map(gusto =>(
                      <List.Item>{gusto.name}</List.Item>
                    ))}

                  </List>
                  <div class="div-buttonsInfo">
                     <Link to="gustos">
                       <Button circular color='violet' icon='eye' />

                     </Link>

                   </div>
              </div>              
        </div>
    )
}
