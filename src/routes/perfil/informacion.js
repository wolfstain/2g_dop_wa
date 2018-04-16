import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';


import {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';


function informacionPerfil({styles, handleClick, datos}){

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
              <List.Item>Nombre: {datos.name}</List.Item>
              <List.Item>Correo: {datos.email}</List.Item>
                <List.Item>Sexo: {datos.gender}</List.Item>
              <List.Item>Numero: {datos.age}</List.Item>

            </List>
            <div class="div-buttonsInfo">
               <Button onClick={handleClick} circular color='blue' icon='write' />
             </div>
          </div>
          <div class="subdiv-information">
             <h2>Gustos</h2>
              <List>
                <List.Item>Nombre: Miguel Cortes</List.Item>
                <List.Item>Correo: miguel_96410@hotmail.com</List.Item>
                  <List.Item>Numero: 3213456978</List.Item>
                <List.Item>Numero: Edad</List.Item>
                <List.Item>Pais: Colombia</List.Item>
              </List>
              <div class="div-buttonsInfo">
                 <Button circular color='green' icon='plus' />
                 <Button circular color='violet' icon='remove' />
                 <Button circular color='blue' icon='write' />
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



const query = gql`
query DetailView($id: Int!){
  userById(id: $id) {
    id,
    name
    picture
    age
    email
    gender
  }
}
`;

const queryOptions = {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
}


export default graphql(query, queryOptions)(informacionPerfil);
