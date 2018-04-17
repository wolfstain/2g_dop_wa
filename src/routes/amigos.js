import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal} from 'semantic-ui-react';
import Slider from "react-slick";
import ModalEditarGusto from './gustos/modalEditarGusto'
import ModalNuevoGusto from './gustos/modalNuevoGusto'
import MyMenu from './menu'


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
  },

}

class Amigos extends Component{

  render() {

    return(
      <div id="contenido-principal">
      <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='group' />
                       Amigos
                       <Header.Subheader>
                         Tus amigos!
                       </Header.Subheader>
                    </Header>
                    <List divided verticalAlign='middle' size={'massive'}>
                       <List.Item>
                         <List.Content floated='right'>
                           <Button circular color='green' icon='eye' />
                           <Button circular color='violet' icon='user delete' />
                           <Button circular color='blue' icon='chat' />
                         </List.Content>
                         <Image avatar src='images/helen.jpg' />
                         <List.Content>
                           Hellen
                         </List.Content>
                       </List.Item>
                       <List.Item>
                         <List.Content floated='right'>
                           <Button circular color='green' icon='eye' />
                           <Button circular color='violet' icon='user delete' />
                           <Button circular color='blue' icon='chat' />
                         </List.Content>
                         <Image avatar src='images/christian.jpg' />
                         <List.Content>
                           Christian
                         </List.Content>
                       </List.Item>
                       <List.Item>
                         <List.Content floated='right'>
                           <Button circular color='green' icon='eye' />
                           <Button circular color='violet' icon='user delete' />
                           <Button circular color='blue' icon='chat' />
                         </List.Content>
                         <Image avatar src='images/daniel.jpg' />
                         <List.Content>
                           Daniel
                         </List.Content>
                       </List.Item>
                       <List.Item>
                         <List.Content floated='right'>
                           <Button circular color='green' icon='eye' />
                           <Button circular color='violet' icon='user delete' />
                           <Button circular color='blue' icon='chat' />
                         </List.Content>
                         <Image avatar src='images/helen.jpg' />
                         <List.Content>
                           Hellen
                         </List.Content>
                       </List.Item>

                     </List>

                  </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


export default Amigos;
