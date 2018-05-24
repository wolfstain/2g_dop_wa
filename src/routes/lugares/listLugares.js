import React,{Component} from 'react'
import Query from '../Query.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import { GET_ALL_LUGARES } from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';


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
              return alllugares.map(({ id,nombre,nivelPrecio }) => (
                <Table.Row>
                  <Table.Cell><Icon name='marker' /> {nombre}</Table.Cell>

                  <Table.Cell>{nivelPrecio}</Table.Cell>

                  <Table.Cell>
                    <Button circular color='blue' icon='eye' />
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
