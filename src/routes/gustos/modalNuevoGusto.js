import React from 'react'
import { Button, Header, Icon, Modal , Form} from 'semantic-ui-react'
import gql from "graphql-tag";
import { Query,graphql } from "react-apollo";


const ModalNuevoGusto = ({handleSubmit,dictCategorias,dictSubcategorias}) =>  {
  return (
  <Modal trigger={<Button circular color='green' icon='plus' />}>
    <Modal.Header>Nuevo gusto</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <CategoriaSelect handleSubmit={handleSubmit} dictCategorias={dictCategorias} dictSubcategorias={dictSubcategorias}/>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)
}

const categorias = ({ data: {loading, error, allCategories},handleSubmit,dictCategorias,dictSubcategorias}) =>  {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;


      let optionsCategoria = []
      let optionsSubcategoria = []

      const args={'user_id':1}

      const handleChange=(ev,input)=>{

        args[input.name]=input.value
        console.log(input.options)

        if (input.name=='category_id'){
          Object.entries(dictSubcategorias).map(function([key,value]){
              if(args['category_id'] == value[1]){
                optionsSubcategoria.push({'key':key,'value':key, 'text':value[0]})
              }
          })
          console.log(optionsSubcategoria);
          

        }

        if(input.name=='subcategory_id'){
          input.options=optionsSubcategoria
          var x=document.getElementById("sub")
          console.log(x);
        }


      }

      return (
        Object.entries(dictCategorias).map(function([key,value]){
            optionsCategoria.push({'key':key,'value':key, 'text':value})
        }),

        <Form onSubmit={(ev)=>handleSubmit(ev,args)}>
          <Form.Group widths='equal'>
            <Form.Input name="name" onChange={handleChange} fluid label='Nombe' placeholder='Nombre' />
            <Form.Input name="description" onChange={handleChange}  fluid label='Descripcion' placeholder='Descripcion' />
            <Form.Select onChange={handleChange} fluid label='Categoria' name='category_id' options={optionsCategoria} placeholder='Categoria' />
            <Form.Select id="sub" onChange={handleChange} fluid label='Subcategoria' name='subcategory_id' options={optionsSubcategoria} placeholder='Categoria' />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      );
};

const queryCategories=gql`
{
	allCategories{
  id
  name
  description
  created_at
  updated_at
  }
}`;

const querySubcategories=`
querySubcategoriesByCategrory($id=Int!){
  subcategoryById(id:$id){
    name
    description
  }
}`;

const CategoriaSelect = graphql(queryCategories)(categorias);


export default ModalNuevoGusto
