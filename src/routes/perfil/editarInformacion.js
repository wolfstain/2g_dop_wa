import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar} from 'semantic-ui-react';
import gpl from 'graphql-tag';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
}
`
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

const queryOptions = {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
}

class editarInformacion extends React.Component{
  state = {
  id: this.props.id,
  name: this.props.name,
  gender: this.props.gender,
  email: this.props.email,
  age: this.props.age,
  picture: this.props.picture,
  }
  render(){
      return(
        <div>
        <Header as='h1' icon textAlign='center'>
           <Icon name='pencil' />
           Editar
           <Header.Subheader>
            Editar Informacion de perfil
           </Header.Subheader>
        </Header>
          <div class="subdiv-information">
          <List>
          <input className="mb2" type = "text" value={this.state.name} placeholder='Name' onChange={e => this.setState({name: e.target.value})}/>
          <input className="mb2" type = "text" value={this.state.gender} placeholder='Gender' onChange={e => this.setState({gender: e.target.value})}/>
          <input className="mb2" type = "text" value={this.state.email} placeholder='email' onChange={e => this.setState({email: e.target.value})}/>
          ><input className="mb2" type = "text" value={this.state.age} placeholder='Age' onChange={e => this.setState({age: e.target.value})}/>
          <input className="mb2" type = "text" value={this.state.picture} placeholder='Age' onChange={e => this.setState({picture: e.target.value})}/>
          </List>
          <div className='flex justify-between'>
          <button onClick={() => this._createLink()}>Submit</button>
       </div>
          </div>
        </div>
    )
  }
  _createLink = async () => {
    const {id, name, gender, email, picture,age } = this.state
    await this.props.updateUser({
      variables: {
        id,
        name,
        gender,
        email,
        picture,
        age
      }
    })
  }

}
const update = graphql(updateuser,{ name: 'updateUser' })(editarInformacion)
export default update
