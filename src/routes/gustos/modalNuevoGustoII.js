import React from 'react'
import { Mutation,Query } from 'react-apollo'
import { withState } from 'recompose'
import { GET_PLEASURES, ADD_PLEASURE, ALL_CATEGORIES, SUBCATEGORIES_BY_CATEGORY ,ALL_SUBCATEGORIES} from '../../queries.js'
import { Button, Header, Icon, Modal , Form} from 'semantic-ui-react'


const updateCache = (cache, { data: { createPleasure } }) => {
  const { pleasureByUser } = cache.readQuery({ query: GET_PLEASURES , variables: {user_id:1} })
  cache.writeQuery({
    query: GET_PLEASURES,
    variables:{user_id:1},
    data: {
      pleasureByUser: pleasureByUser.concat(createPleasure)
    }
  })
}



export default(() => {
  return (
    <Categories />
  );
});


const Categories = ({ onCategorySelected }) => {
  let optionsCategoria=[]
  let optionsSubcategoria=[]
  let dictSubcategorias={}
  let dictCategorias={}
  let args={'user_id':1}

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
    <div>
        <Query query={ALL_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              data.allCategories.map(function(categoria){
                  dictCategorias[categoria.id]=categoria.name
              }),
              Object.entries(dictCategorias).map(function([id,name]){
                  optionsCategoria.push({'key':id,'value':id, 'text':name})
              })
            );
          }}
        </Query>

        <Query query={ALL_SUBCATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              data.allSubcategories.map(function(subcategoria){
                  dictSubcategorias[subcategoria.id]=[subcategoria.name,subcategoria.category_id]
              }),

              <Mutation mutation={ADD_PLEASURE} update={updateCache} variables={args}>
                {createPleasure => (
                    <Form id="form"
                      onSubmit={async e => {
                        e.preventDefault();
                        await createPleasure({variables:args});
                        resetForm()
                        args={}
                      }}
                      >
                      <Form.Group widths='equal'>
                        <Form.Input  name="name" onChange={handleChange} fluid label='Nombe' placeholder='Nombre' />
                        <Form.Input  name="description" onChange={handleChange}  fluid label='Descripcion' placeholder='Descripcion' />
                        <Form.Select onChange={handleChange} fluid label='Categoria' name='category_id' options={optionsCategoria} placeholder='Categoria' />
                        <Form.Select onChange={handleChange} fluid label='SubCategoria' name='subcategory_id' options={optionsSubcategoria} placeholder='SubCategoria' />
                      </Form.Group>
                      <Button type='submit'>Submit</Button>
                    </Form>

                )}
              </Mutation>
            );
          }}
        </Query>

    </div>

  );

};
