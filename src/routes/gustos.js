import React,{ Component } from 'react';
import  {Grid,List,Segment,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';
import Slider from "react-slick";
import ModalEditarGusto from './gustos/modalEditarGusto'
import ModalNuevoGusto from './gustos/modalNuevoGusto'
import MyMenu from './menu'
import gql from "graphql-tag";
import { Query,graphql,compose } from "react-apollo";

const styles={
  gridContent:{
    height:'100%',
    marginLeft:'0px',
    marginRight:'0px',
  },
  sidebar:{
    height:'100%',
  },
  divLogin:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
    padding:'25px',
  },
  columnPerfil:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
  },
  columnInformation:{
    /*backgroundColor:'#fff',*/
    color:'#fff',
  }
}

class Gustos extends Component{

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

      <div id="contenido-principal">
      <MyMenu />
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={6} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='smile' />
                       Gustos
                       <Header.Subheader>
                        Cosas que te gustan!
                       </Header.Subheader>
                    </Header>
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

                        {gustos.map(function(gusto){
                          return (
                            <Table.Row>
                              <Table.Cell><Icon name='like' /> {gusto.name}</Table.Cell>
                              <Table.Cell>{dictSubcategorias[gusto.subcategory_id][0]}</Table.Cell>
                              <Table.Cell>{dictCategorias[dictSubcategorias[gusto.subcategory_id][1]]}</Table.Cell>
                              <Table.Cell>
                                <Button circular color='violet' icon='remove' />
                                <ModalEditarGusto value={1}/>
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>

                    <ModalNuevoGusto  handleSubmit={this.handleCrearGusto} dictCategorias={dictCategorias} dictSubcategorias={dictSubcategorias}/>

                  </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


const queryGustos = gql`
query PleasureUser($id: Int!){
  pleasureByUser(user_id: $id){
   name
   description
   user_id
   subcategory_id
 }
}`
;

const querySubcategorias = gql`
query{
	allSubcategories{
  id
  name
  description
  category_id
  }
}`
;

const queryCategorias = gql`
query{
	allCategories{
  id
  name
  description
  created_at
  updated_at
  }
}`
;


const mutationCrearGusto=gql`
mutation ($name: String!, $description: String!, $user_id: Int! , $subcategory_id:Int!){
  createPleasure(pleasure:{
    name:$name,
    description:$description,
    user_id:$user_id,
    subcategory_id:$subcategory_id
  }){
    name
  }
}`
;
export default compose(
  graphql(queryGustos, {name: 'queryGustos', options: props => ({ variables: { id: 1 }}) }),
  graphql(queryCategorias, {name: 'queryCategorias'}),
  graphql(querySubcategorias, {name: 'querySubcategorias'}),
  graphql(mutationCrearGusto),
)(Gustos);
