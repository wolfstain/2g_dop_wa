import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import Slider from "react-slick";
import Informacion from './perfil/informacion'
import EditarInformacion from './perfil/editarInformacion'
import MyMenu from './menu'

import {graphql,compose} from 'react-apollo';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';


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

class Perfil extends Component{
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

    let {data} = this.props

    if (this.props.queryInformacion.loading || this.props.queryGustos.loading) {
      return <div>Loading...</div>
    }


    const infoUsuario=this.props.queryInformacion.userById
    const gustosUsuario=this.props.queryGustos.pleasureByUser



    return(

      <div id="contenido-principal">
        <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnPerfil}>
              <Image src={infoUsuario.picture} size='medium' circular centered/>
              <Button inverted color='grey'>Cambiar Foto!</Button>
            </Grid.Column>

            <Grid.Column width={6} style={styles.columnInformation}>
              <h1>Usuario</h1>
              {showInformacion && <Informacion styles={styles} handleClick={this.showEditarInformacion} datosUsuario={infoUsuario} gustosUsuario={gustosUsuario}/>}
              {showEditarInformacion && <EditarInformacion styles={styles} handleClick={this.showInformacion} datosUsuario={infoUsuario} />}
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


const queryInformacion = gql`
query DetailView($id: Int!){
  userById(id: $id) {
    id,
    name
    picture
    age
    email
    gender
  }
}`
;

const queryGustos = gql`
query PleasureUser($id: Int!){
  pleasureByUser(user_id: $id){
   name
   description
   user_id
   subcategory_id
 }
}`
;

const updateuser = gql`
mutation updateUser($id: Int!,$name: String!, $gender: String!, $email: String!, $age: String!, $picture: String!){
  updateUser(id: $id,user:{
    name: $name,
    gender: $gender,
    email: $email,
    age: $age,
    picture: $picture,
  })
  {
    name
    gender
  }
}`
;


const queryOptions = {
  options: props => ({
    variables: {
      id: sessionStorage.getItem('id'),
    },
  }),
}


/*export default graphql(query, queryOptions)(Perfil);*/

export default compose(
  graphql(queryInformacion, {name: 'queryInformacion',options: props => ({ variables: { id: sessionStorage.getItem('id') }}) }),
  graphql(queryGustos, {name: 'queryGustos', options: props => ({ variables: { id: sessionStorage.getItem('id') }}) }),
)(Perfil);
