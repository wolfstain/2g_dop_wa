import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Input,Divider,Header,Sidebar,Table} from 'semantic-ui-react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import MyMenu from './menu'
import 'semantic-ui-css/semantic.min.css'
import '../css/main.css'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

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
  columnImg:{
    /*backgroundColor:'#fff',*/
    textAlign:'left',
  },
  columnInformation:{
    /*backgroundColor:'#fff',*/
    color:'#fff',
  }
}

const config = {
  apiKey: "AIzaSyAq6mlKXjyX4cAtz3eaXtI7725fMsuvXJM",
  authDomain: "dop-un.firebaseapp.com",
  databaseURL: "https://dop-un.firebaseio.com",
  storageBucket: "dop-un.appspot.com"
};
firebase.initializeApp(config);



const upeuser = gql`
mutation updateUser($id: Int!,$name: String, $gender: String,$email: String, $picture:String, $age:String, $password:String){
  updateUser(id: $id,user:{
    name: $name,
    gender: $gender,
    email: $email,
    picture:$picture,
    age: $age,
    password: $password
  })
  {
    name
    gender
  }
}
`

class editarInformacion extends React.Component {
  handleRef = (c) => {
    this.inputRef = c
  }

  focus = () => {
    this.inputRef.focus()
  }
  state = {
  id: this.props.match.params.id,
  name: this.props.name,
  gender: this.props.gender,
  email: this.props.email,
  age: this.props.age,
  password: this.props.password,
  picture: this.props.picture,
  avatar: '',
  isUploading: false,
  progress: 0,
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({picture: url}));
  };
  render() {
    return (
      <div>
      <Header as='h1' icon textAlign='center'>
          <br/>
           <Icon name='user' />
           Perfil
           <Header.Subheader>
            Editar Informacion de perfil
           </Header.Subheader>
        </Header>
      <div id="contenido-principal">
      <MyMenu/>
      <div class="pusher">
      <Grid columns={2} centered verticalAlign='left' style={styles.gridContent}>

    <Grid.Column width={9} style={styles.columnInformation}>
	<div class="ui large form">
        <Table responsive>
          <tbody>
          <tr>
            <td><h12>Nombre: </h12></td>
            <td><h12><Input ref={this.handleRef} type = "text" value={this.state.name} placeholder='Nombre' onChange={e => this.setState({name: e.target.value})}/></h12></td>
          </tr>
          <tr>
            <td><h12>Género: </h12></td>
            <td><h12><Input ref={this.handleRef} type = "text" value={this.state.gender} placeholder='Género' onChange={e => this.setState({gender: e.target.value})}/></h12></td>
          </tr>
          <tr>
            <td><h12>Email: </h12></td>
            <td><h12><Input ref={this.handleRef} type = "email" value={this.state.email} placeholder='Email' onChange={e => this.setState({email: e.target.value})}/></h12></td>
          </tr>
          <tr>
            <td><h12>Edad: </h12></td>
            <td><h12><Input  readonly ref={this.handleRef} type = "text" value={this.state.age} placeholder='Edad' onChange={e => this.setState({age: e.target.value})}/></h12></td>
          </tr>
          <tr>
            <td><h12>Password: </h12></td>
            <td><h12><Input ref={this.handleRef} type = "password" value={this.state.password} placeholder='Password' onChange={e => this.setState({password: e.target.value})}/></h12></td>
          </tr>
          </tbody>
          </Table>
          <Grid.Column width={9} style={styles.columnImg}>
            <Table responsive>
              <tbody>
              <tr>
              <td><h12>Foto:</h12></td>
              <td><h12>{this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
              }
              {this.state.picture &&
                <Image src={this.state.picture} size='medium' verticalAlign='middle' circular  centered/>
              }
              <CustomUploadButton
                  accept="image/*"
                  name="avatar"
                  randomizeFilename
                  storageRef={firebase.storage().ref('images')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                  style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                >
                Seleccionar imagen
                  </CustomUploadButton>
                  </h12></td>
              </tr>
              </tbody>
              </Table>
	</Grid.Column>
	</div>
              
          <div className='flex justify-between'>
          <br/>
           <button onClick={() => this._createLink()}>Actualizar información</button>
          </div>
        </Grid.Column>
    </Grid>
    </div>
    </div>
    </div>
    )
  }
  _createLink = async () => {
    const {id, name, gender,email,age,picture,password } = this.state
    await this.props.updateUser({
      variables: {
        id,
        name,
        gender,
        email,
        age,
        picture,
        password
      }
    })
  }
}

const update = graphql(upeuser,{ name: 'updateUser' })(editarInformacion)
export default update
