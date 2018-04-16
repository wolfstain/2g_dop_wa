import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';





export default({styles, handleClick}) => {
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
            <List.Item>Nombre: Miguel Cortes</List.Item>
            <List.Item>Correo: miguel_96410@hotmail.com</List.Item>
              <List.Item>Numero: 3213456978</List.Item>
            <List.Item>Numero: Edad</List.Item>
            <List.Item>Pais: Colombia</List.Item>
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
