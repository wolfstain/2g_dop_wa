import React,{ Component } from 'react';
import  {Grid,List,Segment,Card,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal} from 'semantic-ui-react';
import Slider from "react-slick";
import MyMenu from './menu'
import  { Redirect } from 'react-router-dom'


import PosiblesMatch from './matchs/posiblesMatch.js'

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


class Match extends Component{


  render() {

    return(
      <div id="contenido-principal">
      <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={12} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='smile' />
                       Encuentra Amigos!
                       <Header.Subheader>
                        Dale like a la persona que te guste!
                       </Header.Subheader>
                    </Header>
                <PosiblesMatch />
              </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


export default Match;
