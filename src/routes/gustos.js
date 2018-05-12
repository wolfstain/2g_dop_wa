import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';
import Slider from "react-slick";
import ModalEditarGusto from './gustos/modalEditarGusto'
import ModalNuevoGusto from './gustos/modalNuevoGusto'
import MyMenu from './menu'
import gql from "graphql-tag";
import { Query,graphql,compose } from "react-apollo";
import FormNuevoGusto from './gustos/formNuevoGusto.js'
import ListGustos from './gustos/listGustos.js'


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

export default class Gustos extends Component{
  render() {
    return(
      <div id="contenido-principal">
      <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={10} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='smile' />
                       Gustos
                       <Header.Subheader>
                        Cosas que te gustan!
                       </Header.Subheader>
                    </Header>
                    <FormNuevoGusto />
                    <ListGustos />
                  </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}
