
import React,  {Component} from 'react';
import {graphql} from 'react-apollo';

import gpl from 'graphql-tag';
import gql from 'graphql-tag';
import { Query } from "react-apollo";


import { compose } from 'react-apollo';







class GustoList extends Component {


  render() {
    if (this.props.gustosUsuario && this.props.gustosUsuario.loading) {
      return <div>Loading</div>
    }

    // 2
    if (this.props.gustosUsuario && this.props.gustosUsuario.error) {
      return <div>Error</div>
    }

    // 3
    const pleasuresUser = this.props.gustosUsuario.pleasureByUser
    const userSubcategory = this.props.usuariosSubcategoria.pleasuresBySubcategory

    var a=[];

    return (

      console.log(pleasuresUser),
      console.log(userSubcategory),
      //<div>{linksToRender.map(pleasure => <h1>{pleasure.description}</h1>)}</div>
      pleasuresUser.map(function(pleasure){
      a.push(pleasure.subcategory_id);

      })
    )
  }
}





const GET_PLEASURES_BY_ID = gql`
query GustosUsuario{
  pleasureByUser(user_id:3){
    subcategory_id
  }
}
`;

const USERS_BY_SUBCATEGORY=gql`
query UsuariosSubcategoria($ids:ID){
  pleasuresBySubcategory(subcategory_id:$ids){
    name
    description
    user_id
  }
}
`;





export default compose(
  graphql(GET_PLEASURES_BY_ID,{name: 'gustosUsuario'}),
  graphql(USERS_BY_SUBCATEGORY,{name: 'usuariosSubcategoria', options: ({gustosUsuario:{subcategory_id}={}}) => ({variables: {subcategory_id}}) }),
)(GustoList)


/*



const userQuery = gql`query User { user { id } }`;
const stuffQuery = gql`query SomeOtherStuff($id: ID) { someOtherStuff(id: $id){ stuff } }`;

export default compose(
  graphql(userQuery, { name: 'userData' })
  graphql(stuffQuery, { name: 'stuffData', options: ({userData:{id}={}}) => ({variables: {id}}) }),
)(YourComponent)


const GET_PLEASURES_BY_ID = gql`
query GustosUsuario($id:Int!){
  pleasureByUser(user_id:$id){
    subcategory_id
  }
}
`;

const USERS_BY_SUBCATEGORY=gql`
query UsuariosSubcategoria($ids:ID){
  pleasuresBySubcategory(subcategory_id:$ids){
    name
    description
    user_id
  }
}
`;


export default compose(
  graphql(GET_PLEASURES_BY_ID,{name: 'gustosUsuario' ,options:{variables:{id:3}}}),
  graphql(USERS_BY_SUBCATEGORY,{name: 'usuariosSubcategoria'}),
)(GustoList)




const pleasures = () => (
  <Query query={GET_PLEASURES_BY_ID}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return (
        data.pleasureByUser.map((pleasure) => <h1>{pleasure.description}</h1>)
      );
    }}
  </Query>
);


class PosiblesEmparejamientos extends Component{
  render(){
    return(
      <div>
      <h1>Posibles emparejamientos</h1>
      <pleasures />
      </div>
    )
  }
}


export default PosiblesEmparejamientos;*/
