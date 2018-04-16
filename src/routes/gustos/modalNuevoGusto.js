import React from 'react'
import { Button, Header, Icon, Modal , Form} from 'semantic-ui-react'
import gql from "graphql-tag";
import { Query,graphql } from "react-apollo";

const options = []

const ModalNuevoGusto = () =>  {
  return (
  <Modal trigger={<Button circular color='green' icon='plus' />}>
    <Modal.Header>Nuevo gusto</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <CategoriaSelect />
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



const categorias = ({ data: {loading, error, allCategories }}) =>  {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      const handleChange=(ev,input)=>{
        console.log(input.value);
      }
      return (
        allCategories.map(function(categoria){
          options.push({'key':categoria.id, 'value':categoria.id , 'text':categoria.name});
        }),
        console.log(options),
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
            <Form.Select onChange={handleChange} fluid label='Categoria' options={options} placeholder='Categoria' />
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



const CategoriaSelect = graphql(queryCategories)(categorias);

export default ModalNuevoGusto
