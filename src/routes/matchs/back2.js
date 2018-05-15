import React,{Component} from 'react'
import Slider from "react-slick";
import { Mutation,graphql,compose, Query} from 'react-apollo'
import { GET_PLEASURES,ALL_USERS,ADD_MATCH,FILTER_LIST} from  '../../queries.js'
import  {Grid,List,Loader,Card,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';




const updateCache = (cache, { data: { createMatch } }) => {
  const { allUsers } = cache.readQuery({ query: ALL_USERS})

  console.log({allUsers});
  cache.writeQuery({
    query: ALL_USERS,
    data: {
      allUsers: allUsers.filter(user => user.id !== createMatch.id_user_two)
    }
  })
}



const styles={
  gmyButtons:{
    textAlign:'center',
  },
  myButtons:{
    fontSize:'30px',
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


class ListPosibles extends Component{

  tmp;
  args={'id':1}
  handleFilter=async (ev)=>{
    const response = await this.props.mutate({
      variables: this.args
    })
    console.log(response.data.filtrateListPossibles.listUsersFiltered)
  }

  render(){
    let listUsers=[]
    let listFiltered;

    return(
      <div>
        <Query query={ALL_USERS}>
          {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              return(
                console.log(data.allUsers),
                data.allUsers.map(({ id,name,age, gender,picture }) => (
                  listUsers.push(id)
                )),
                console.log(listUsers),
                this.args['listUsers']=listUsers,
                <p>hola</p>
              )
          }}
        </Query>
        <Button onClick={this.handleFilter} circular color='violet' icon='remove' />
      </div>


    )

  }
}



const Posibles = graphql(FILTER_LIST)(ListPosibles)

export default Posibles
