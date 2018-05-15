import gql from "graphql-tag";

export const DELETE_PLEASURE=gql`
mutation deletePleasure ($id:Int!){
  deletePleasure(id:$id){
    id
  }
}`
;

export const GET_PLEASURES = gql`
query ($user_id: Int!){
  pleasureByUser(user_id: $user_id){
   id
   name
   description
   subcategory_id
 }
}`
;


export const ADD_PLEASURE=gql`
mutation createPleasure ($name: String!, $description: String!, $user_id: Int! , $subcategory_id:Int!){
  createPleasure(pleasure:{
    name:$name,
    description:$description,
    user_id:$user_id,
    subcategory_id:$subcategory_id
  }){
    id
    name
    description
    user_id
    subcategory_id
  }
}`
;



export const UPDATE_PLEASURE=gql`
mutation updateleasure($id: Int!,$name: String!, $description: String!, $user_id: Int! , $subcategory_id:Int!){
  updatePleasure(id:$id,pleasure:{
    name:$name,
    description:$description,
    user_id:$user_id,
    subcategory_id:$subcategory_id
  }){
    name
    description
    user_id
    subcategory_id
  }
}`
;

export const ALL_CATEGORIES=gql`
query allCategories{
	allCategories{
    id
    name
    description
  }
}
`;

export const SUBCATEGORIES_BY_CATEGORY=gql`
query subcategoriesByCategory($category_id:Int!){
  subcategoriesByCategory(category_id:$category_id){
    id
    name
  }
}
`;


export const ADD_MATCH=gql`
mutation createMatch($id_user_one:Int!, $id_user_two:Int!,$state_user_one:Int!){
  createMatch(match:{
    id_user_one:$id_user_one,
    id_user_two:$id_user_two,
    state_user_one:$state_user_one
  }) {
    id_user_one
    id_user_two
    state_user_one
  }
}`
;



export const ALL_SUBCATEGORIES=gql`
query allSubcategories{
	allSubcategories{
    id
    name
    description
    category_id
  }
}`
;

export const ALL_USERS=gql`
query allUsers{
  allUsers{
    id
    name
    gender
    picture
    age
  }
}`
;

export const FILTER_LIST=gql`
mutation filtrateListPossibles($id:Int!, $listUsers:[Int]!){
  filtrateListPossibles(id:$id,listUsers:{listUsers:$listUsers}){
    listUsersFiltered
  }
}
`
;
