import React,{Component} from 'react'
import Query from '../Query.js'
import ViewLugar from '../lugares/viewLugar'
import Cita from '../citas/cita.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import { CITA_BY_PERSON ,USER_INFORMATION,ALL_USERS,GET_ALL_LUGARES,LUGAR_BY_ID,MARTCH_BY_USER } from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Card,Feed} from 'semantic-ui-react';


const styles={
  citaCard:{
  witdh:'100% !important',
  },
}

class ListCitas extends Component{
  render() {

    if (this.props.queryAllUsers.loading ) {
      return <div>Loading...</div>
    }

    const allUsers=this.props.queryAllUsers.allUsers
    const citasByPerson=this.props.queryCitaByPerson.citaByPersonaId

    let infoUsers={}
    let infoLugares={}

    allUsers.map(({ id,name,age, gender,picture }) => (
      infoUsers[id]={'name':name,'age':age, 'gender':gender , 'picture':picture}
    ))

    const matchUser=this.props.queryMatchByUser.matchByUser
    let listAmigos=[]

    matchUser.map(function(match){
      if (match.id_user_one === parseInt(sessionStorage.getItem('id')) ) {
        listAmigos.push({'id':match.id,'id_user':match.id_user_two})
      }else {
        listAmigos.push({'id':match.id,'id_user':match.id_user_one})
      }
    })



    return(

      <div>
          <Cita infoUsers={infoUsers} listAmigos={listAmigos}/>

          {citasByPerson.map(({id,cita,lugar,fecha,estado,personas})=>(
            <Card style={styles.citaCard}>
              <Card.Content>
              <Card.Header>
                {cita}
              </Card.Header>
              <Card.Meta content={fecha} />
              </Card.Content>
              <Card.Content>
              <Feed>
                {personas.map((person)=>(
                  <Feed.Event>
                    <Feed.Label image={infoUsers[parseInt(person)].picture} />
                   <Feed.Content>
                     <Feed.Summary>
                       {infoUsers[parseInt(person)].name}
                     </Feed.Summary>
                   </Feed.Content>
                 </Feed.Event>
               ))
                }

              </Feed>
              </Card.Content>
              <Card.Description>
                <Query query={LUGAR_BY_ID} variables={{id:lugar}}>
                    {({ lugarById }) => {
                      return(
                        <ViewLugar latlng={{'lat':lugarById.ubicacion.coordinates[1],'lng':lugarById.ubicacion.coordinates[0]}} />
                      )
                    }}
                </Query>
              </Card.Description>
              </Card>
          ))}


      </div>






    )
  }
}


export default compose(
  graphql(ALL_USERS, {name: 'queryAllUsers'}),
  graphql(MARTCH_BY_USER, {name: 'queryMatchByUser', options: props => ({ variables: { id: sessionStorage.getItem('id')}})}),
  graphql(CITA_BY_PERSON, {name: 'queryCitaByPerson', options: props => ({ variables: { id: sessionStorage.getItem('id')}})})
)(ListCitas);
