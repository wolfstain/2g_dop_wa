import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import Slider from "react-slick";

import Informacion from './perfil/informacion'
import EditarInformacion from './perfil/editarInformacion'

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

class Inicio extends Component{


  state={
    showInformacion:true,
    showEditarInformacion:false,
  }


  showEditarInformacion= (ev)=>{
      ev.preventDefault()
      this.setState({showInformacion:false,showEditarInformacion:true})
  }

  showInformacion= (ev)=>{
      ev.preventDefault()
      this.setState({showInformacion:true,showEditarInformacion:false})
  }


  render() {
    const {showInformacion,showEditarInformacion} = this.state;

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
            <Grid.Column width={6} style={styles.columnPerfil}>
              <Image src='images/perfil.jpg' size='medium' circular centered/>
              <Button inverted color='grey'>Cambiar Foto!</Button>
            </Grid.Column>

            <Grid.Column width={6} style={styles.columnInformation}>
              {showInformacion && <Informacion styles={styles} handleClick={this.showEditarInformacion} />}
              {showEditarInformacion && <EditarInformacion styles={styles} handleClick={this.showInformacion} />}
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}

export default Inicio;
