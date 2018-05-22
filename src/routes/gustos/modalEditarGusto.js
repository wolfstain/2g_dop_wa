import React from 'react'
import { Button, Header, Icon, Modal , Form} from 'semantic-ui-react'
import { GET_PLEASURES, ADD_PLEASURE, ALL_CATEGORIES, SUBCATEGORIES_BY_CATEGORY ,ALL_SUBCATEGORIES,UPDATE_PLEASURE} from '../../queries.js'
import { Mutation,Query } from 'react-apollo'





const ModalEditarGusto = ({id,name,description, subcategory_id, dictCategorias,dictSubcategorias}) => {
  let args={'id':parseInt(id),'user_id':parseInt(sessionStorage.getItem('id')), 'name':name,description:'description',subcategory_id:parseInt(subcategory_id)}
  let optionsCategoria=[]
  let optionsSubcategoria=[]

  function resetForm() {
    document.getElementById("form").reset();
  }

  const handleChange=(ev,input)=>{
    args[input.name]=input.value
    if (input.name=='category_id'){
      optionsSubcategoria.length = 0;
      Object.entries(dictSubcategorias).map(function([key,value]){
          if(args['category_id'] == value[1]){
            optionsSubcategoria.push({'key':key,'value':key, 'text':value[0]});
          }
      })
    }
  }

  return(

    Object.entries(dictCategorias).map(function([id,name]){
        optionsCategoria.push({'key':id,'value':id, 'text':name})
    }),
    <Modal trigger={<Button circular color='blue' icon='write' />}>
      <Modal.Header>Editar gusto</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Mutation mutation={UPDATE_PLEASURE}  variables={args}>
            {updatePleasure => (
                <Form id="form"
                  onSubmit={async e => {
                    e.preventDefault();
                    console.log(args);

                    await updatePleasure({variables:args});
                    resetForm()
                    window.location.reload()
                    args={}
                  }}
                  >
                  <Form.Group widths='equal'>
                    <Form.Input  name="name" onChange={handleChange} fluid label='Nombe' placeholder='Nombre' defaultValue={name}/>
                    <Form.Input  name="description" onChange={handleChange}  fluid label='Descripcion' placeholder='Descripcion' defaultValue={description}/>
                    <Form.Select onChange={handleChange} fluid label='Categoria' name='category_id' options={optionsCategoria} placeholder='Categoria' />
                    <Form.Select onChange={handleChange} fluid label='SubCategoria' name='subcategory_id' options={optionsSubcategoria} placeholder='SubCategoria' />
                  </Form.Group>
                  <Button type='submit' color="blue">Editar</Button>
                </Form>
            )}
          </Mutation>

        </Modal.Description>
      </Modal.Content>
    </Modal>

  )
}

export default ModalEditarGusto
