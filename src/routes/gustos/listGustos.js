import React,{Component} from 'react'
import Query from './Query.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import { GET_PLEASURES,DELETE_PLEASURE,ALL_CATEGORIES,ALL_SUBCATEGORIES } from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';


const updateCache = (cache, { data: { deletePleasure } }) => {
  const { pleasureByUser } = cache.readQuery({ query: GET_PLEASURES , variables: {user_id:1} })
  cache.writeQuery({
    query: GET_PLEASURES,
    variables:{user_id:1},
    data: {
      pleasureByUser: pleasureByUser.filter(pleasure => pleasure.id !== deletePleasure.id)
    }
  })
}


class ListGustos extends Component{
  handleCrearGusto=async (ev,args)=>{
    console.log(args)
    const response = await this.props.mutate({
      variables: args
    })
    console.log(response)
  }
  render() {
    if (this.props.queryCategorias.loading || this.props.queryGustos.loading|| this.props.querySubcategorias.loading) {
      return <div>Loading...</div>
    }

    const subcategorias=this.props.querySubcategorias.allSubcategories
    const categorias=this.props.queryCategorias.allCategories
    const gustos=this.props.queryGustos.pleasureByUser

    const dictSubcategorias={}
    const dictCategorias={}

    return(

      subcategorias.map(function(subcategoria){
          dictSubcategorias[subcategoria.id]=[subcategoria.name,subcategoria.category_id]
      }),
      categorias.map(function(categoria){
          dictCategorias[categoria.id]=categoria.name
      }),

      <div>
        <Table color={'blue'} key={'blue'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Gusto</Table.HeaderCell>
              <Table.HeaderCell>SubCategoria</Table.HeaderCell>
                <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          <Query query={GET_PLEASURES} variables={{user_id:1}}>
            {({ pleasureByUser }) => {
              return pleasureByUser.map(({ id,name,subcategory_id }) => (
                <Table.Row>
                  <Table.Cell><Icon name='like' /> {id}</Table.Cell>
                  <Table.Cell>{dictSubcategorias[subcategory_id][0]}</Table.Cell>
                  <Table.Cell>{dictCategorias[dictSubcategorias[subcategory_id][1]]}</Table.Cell>

                  <Table.Cell>

                    <Mutation
                      mutation={DELETE_PLEASURE}
                      variables={{ id }}
                      update={updateCache}
                    >
                      {(deletePleasure, { loading, error }) => (
                        <span
                          onClick={() => deletePleasure({ variables: { id : parseInt(id) } })}
                          className="fr red pointer"
                        >
                          {loading ? "" : <Button circular color='violet' icon='remove' />}
                        </span>
                      )}
                    </Mutation>

                  </Table.Cell>
                </Table.Row>
              ))
            }}
          </Query>
        </Table.Body>
      </Table>
      </div>
    )
  }
}

export default compose(
  graphql(GET_PLEASURES, {name: 'queryGustos', options: props => ({ variables: { id: 1 }}) }),
  graphql(ALL_CATEGORIES, {name: 'queryCategorias'}),
  graphql(ALL_SUBCATEGORIES, {name: 'querySubcategorias'})
)(ListGustos);
