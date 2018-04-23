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
            <h2>Información basica</h2>

            <List>
              <List.Item>Nombre: {datosUsuario.name}</List.Item>
              <List.Item>Correo: {datosUsuario.email}</List.Item>
                <List.Item>Sexo: {datosUsuario.gender}</List.Item>
              <List.Item>Numero: {datosUsuario.age}</List.Item>
            </List>
            <div class="div-buttonsInfo">
               <a href={`/perfil/editarInformacion/${datosUsuario.id}`}><Button onClick={handleClick} circular color='blue' icon='write' />
               </a>
             </div>
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
          <div class="subdiv-information" >
            <h2>Lugares</h2>
            <List>
              <List.Item>Nombre: Miguel Cortes</List.Item>
              <List.Item>Correo: miguel_96410@hotmail.com</List.Item>
                <List.Item>Numero: 3213456978</List.Item>
              <List.Item>Numero: Edad</List.Item>
              <List.Item>Pais: Colombia</List.Item>
            </List>
            <div class="div-buttonsInfo">
               <Button onClick={handleClick} circular color='green' icon='plus' />
               <Button circular color='violet' icon='remove' />
               <Button circular color='blue' icon='write' />
             </div>
          </div>
        </div>
    )
}
