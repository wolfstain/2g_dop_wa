
import React ,{Component}from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal} from 'semantic-ui-react';
import Slider from "react-slick";
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
  }
}

class Home extends Component{

  render() {
    return(
      <div id="contenido-principal">
        <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnInformation}>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


export default Home;
