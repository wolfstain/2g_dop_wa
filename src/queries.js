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
