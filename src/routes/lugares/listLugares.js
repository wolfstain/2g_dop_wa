import React,{Component} from 'react'
import Query from '../Query.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import { GET_ALL_LUGARES,DELETE_LUGAR } from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';
import ModalViewLugar from './viewLugar'


const updateCache = (cache, { data: { deleteLugar } }) => {
  const { alllugares } = cache.readQuery({ query: GET_ALL_LUGARES})
  cache.writeQuery({
    query: GET_ALL_LUGARES,
    data: {
      alllugares: alllugares.filter(lugar => lugar.id !== deleteLugar.id)
    }
  })
}


export default class ListLugares extends Component{

  render() {

    return(
      <div>
        <Table color={'blue'} key={'blue'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Nivel/costo</Table.HeaderCell>
              <Table.HeaderCell>Ver</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          <Query query={GET_ALL_LUGARES}>
            {({ alllugares }) => {
              return alllugares.map(({ _id,nombre,nivelPrecio,ubicacion }) => (

                <Table.Row>
                  <Table.Cell><Icon name='marker' /> {nombre}</Table.Cell>

                  <Table.Cell>{nivelPrecio}</Table.Cell>

                  <Table.Cell>
                    <ModalViewLugar latlng={{'lat':ubicacion.coordinates[1],'lng':ubicacion.coordinates[0]}}/>

                      <Mutation
                        mutation={DELETE_LUGAR}
                        variables={{ _id }}
                      >
                        {(deleteLugar, { loading, error }) => (

                          <span
                            onClick={() => deleteLugar({ variables: { id : parseInt(_id) } })}
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
