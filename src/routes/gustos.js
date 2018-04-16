import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal} from 'semantic-ui-react';
import Slider from "react-slick";
import ModalEditarGusto from './gustos/modalEditarGusto'
import ModalNuevoGusto from './gustos/modalNuevoGusto'
import gql from "graphql-tag";
import { Query,graphql } from "react-apollo";

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

class Gustos extends Component{

  render() {
    return(
      <div id="contenido-principal">
        <div class="ui vertical inverted left visible sidebar menu">
        <div class="div-image-profile-menu">
          <Image src='images/perfil.jpg' size='small' verticalAlign='middle' circular  centered/>
        </div>
          <a class="item" href="/inicio">
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
      </div>
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='smile' />
                       Gustos
                       <Header.Subheader>
                        Cosas que te gustan!
                       </Header.Subheader>
                    </Header>
                    <List divided verticalAlign='middle'>
                      <List.Item>
                        <List.Content floated='right'>
                          <Button circular color='violet' icon='remove' />
                          <ModalEditarGusto value={1}/>
                        </List.Content>
                        <Icon name='like' />
                        <List.Content>
                          Musica
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content floated='right'>
                          <Button circular color='violet' icon='remove' />
                          <ModalEditarGusto value={1}/>
                        </List.Content>
                        <Icon name='like' />
                        <List.Content>
                          Musica
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content floated='right'>
                          <Button circular color='violet' icon='remove' />
                          <ModalEditarGusto value={1}/>
                        </List.Content>
                        <Icon name='like' />
                        <List.Content>
                          Musica
                        </List.Content>
                      </List.Item>
                    </List>
                    <ModalNuevoGusto/>

                  </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}

export default Gustos;
