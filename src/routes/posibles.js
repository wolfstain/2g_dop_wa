
import React from 'react';
import {graphql} from 'react-apollo';

import gpl from 'graphql-tag';

import GustoList from './GustoList'



export default graphql(gpl`mutation {
  createPleasure(pleasure:{
    name:"Bahcata",
    description:"Me gusta Bachata",
    user_id:4,
    subcategory_id:1
  }){
    user_id
    subcategory_id
  }

}`)(responsePost);
const resultado= (response)=><p>response.user_id - response.subcategory_id</p>;
var a=[];

function responsePost({mutate}){
  return(
    <div>

    <button onClick={() => {
      mutate({
        // The optimistic response has all of the fields that are included in
        // the GraphQL mutation document below.
        optimisticResponse: {
          createTodo: {
            name: "name", // A temporary id. The server decides the real id.
            description: "description",
            user_id: 0,
            subcategory_id:0,
          },
        },
      }).then(({data}) =>{
        a.push(data.createPleasure.user_id)
        console.log(a);
        document.getElementById("data").innerHTML=a;
      });
    }}>
      Add Todo
    </button>
    <GustoList />
    <h1 id="data"></h1>
    </div>



  );

}
