import React,{Component} from 'react'
import Query from '../Query.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import {ALL_USERS,MARTCH_BY_USER} from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';




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


class ListAmigos extends Component{

  render() {
    if (this.props.queryAllUsers.loading || this.props.queryMatchByUser.loading) {
      return <div>Loading...</div>
    }

    const allUsers=this.props.queryAllUsers.allUsers
    const matchUser=this.props.queryMatchByUser.matchByUser

    let listAmigos=[]
    let infoUsers={}

    allUsers.map(({ id,name,age, gender,picture }) => (
      infoUsers[id]={'name':name,'age':age, 'gender':gender , 'picture':picture}
    ))

    matchUser.map(function(match){
      if (match.id_user_one === parseInt(sessionStorage.getItem('id')) ) {
        listAmigos.push({'id':match.id,'id_user':match.id_user_two})
      }else {
        listAmigos.push({'id':match.id,'id_user':match.id_user_one})

      }
    })


    console.log(listAmigos)

    return(
      <List divided verticalAlign='middle' size={'massive'}>
        {listAmigos.map((match)=>(
          console.log(allUsers[match.id_user-1].picture),
          <List.Item>
            <List.Content floated='right'>
            <a href = {`perfil_amigo/${match.id_user}`}>
              <Button circular color='green' icon='eye' />
            </a>
              <Button circular color='violet' icon='user delete' />
            </List.Content>
            <Image avatar src={infoUsers[match.id_user].picture} />
            <List.Content>
              {infoUsers[match.id_user].name}
            </List.Content>
          </List.Item>
        ))}
      </List>
    )
  }
}

export default compose(
  graphql(ALL_USERS, {name: 'queryAllUsers'}),
  graphql(MARTCH_BY_USER, {name: 'queryMatchByUser', options: props => ({ variables: { id: sessionStorage.getItem('id')}})})
)(ListAmigos);
