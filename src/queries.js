import gql from "graphql-tag";


export const USER_INFORMATION= gql`
query DetailView($id: Int!){
  userById(id: $id) {
    id
    name
    picture
    age
    email
    gender
  }
}`
;


export const UPDATE_USER = gql`
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


export const MARTCH_BY_USER=gql`
query matchByUser($id:Int!){
  matchByUser(id:$id){
    id
    id_user_one
    id_user_two
  }
}
`;


export const ACCEPTED_BY_USER=gql`
query acceptedByUser($id:Int!){
  acceptedByUser(id:$id){
    id_user_accepted
  }
}
`;

export const REJECTED_BY_USER=gql`
query rejectedByUser($id:Int!){
  rejectedByUser(id:$id){
    id_user_rejected
  }
}
`;

export const CREATE_LUGAR=gql`
mutation createLugar($nombre:String! , $nivelPrecio:String! , $coordinates: [Float]!,$point:String!, $index:String!){
  createLugar(lugar: {
    nombre: $nombre,
    nivelPrecio: $nivelPrecio,
    ubicacion: {
      type: $point,
      coordinates: $coordinates,
      index: $index
    }
  })
  {
    _id
    nombre
    nivelPrecio
    ubicacion{
      type
      coordinates
      index
    }
  }
}
`;


export const GET_ALL_LUGARES=gql`
query alllugares{
  alllugares{
    _id
    nombre
    nivelPrecio
    ubicacion{
      coordinates
    }
  }
}
`;
export const LUGAR_BY_ID=gql`
query lugarById($id:Int!){
  lugarById(id:$id){
    nombre
    nivelPrecio
    ubicacion{
      coordinates
    }
  }
}
`;


export const DELETE_LUGAR=gql`
mutation deleteLugar($id:Int!){
  deleteLugar(id:$id){
    _id
  }
}
`;





export const CITA_BY_PERSON=gql`
query citaByPersonaId($id:Int!){
  citaByPersonaId(id:$id){
    id
    cita
    lugar
    fecha
    estado
    personas
  }
}
`;

export const CREATE_CITA=gql`
mutation createCita($cita:String!,$lugar:Int!,$fecha:String!,$personas:[Int]!, $estado:String!){
  createCita(cita:{
    cita:$cita,
    lugar:$lugar,
    fecha: $fecha,
    personas:$personas,
    estado:$estado,
    visibilidad:false
  }){
    id
    cita
    lugar
    personas
    fecha
    estado
    visibilidad
  }
}
`;
