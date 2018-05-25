import React,{Component} from 'react'
import Query from '../Query.js'
import { Mutation,graphql,compose  } from 'react-apollo'
import { GET_ALL_LUGARES,DELETE_LUGAR,MARTCH_BY_USER,CREATE_CITA } from  '../../queries.js'
import  {Grid,List,Loader,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table,Checkbox,Accordion} from 'semantic-ui-react';
import ModalViewLugar from '../lugares/viewLugar'


const styles={
  inline:{
    display:'inline-block',
  },
  modalCita:{
    marginTop:'0px',
    minHeight:'400px',
  },
}






const ModalNuevaCita = ({infoUsers,listAmigos}) =>  {
  return (
  <Modal trigger={<Button circular color='green' icon='plus' />} style={styles.modalCita}>
    <Modal.Header>Nuevo gusto</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <Cita infoUsers={infoUsers} listAmigos={listAmigos}/>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
}

var options=[parseInt(sessionStorage.getItem('id'))];

class Cita extends Component{
  constructor(props) {
      super(props);
      this.infoUsers=this.props.infoUsers;
      this.listAmigos=this.props.listAmigos;
      this.args={};
    }

  state = { activeIndex: -1 }

  handleClickAcordion = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


   handleChangeRadio = (e,input) => {
     this.args['lugar']=input.value,
     console.log(this.args)
   }

   handleChange=(ev,input)=>{
      let index
      console.log(input.checked)
      if (input.checked) {
        options.push(input.value)
      }else {
        index = options.indexOf(input.value)
        options.splice(index, 1)
      }
      this.args['personas']=options
      console.log(this.args)
    }


    handleChangeInput=(ev,input)=>{
      this.args[input.name]=input.value
      console.log(this.args);
    }


  render(){
    const { activeIndex } = this.state

    return(
      <Mutation mutation={CREATE_CITA} variables={this.args}>
        {createCita => (
          <Form id="form"
            onSubmit={async e => {
              e.preventDefault();
              await createCita({variables:this.args});
              window.location.reload();
              this.args={}
            }}
            >

          <div>
            <Form.Group widths='equal'>
              <Form.Input  name="cita" onChange={this.handleChangeInput} fluid label='Cita' placeholder='Cita' />
              <Form.Input  name="fecha" onChange={this.handleChangeInput}  fluid label='fecha' placeholder='DD-MM-AA' />
              <Form.Select onChange={this.handleChangeInput} fluid label='estado' name='estado' options={[{'key':"Activa",'value':"Activa", 'text':"Activa"},{'key':"Rechazada",'value':"Rechazada", 'text':"Rechazada"}]} placeholder='Categoria' />
            </Form.Group>
          </div>

          <Accordion fluid styled>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClickAcordion}>
              <Icon name='dropdown' />
              Agrega amigos a tu cita!
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <div>
                <List divided verticalAlign='middle' size={'massive'}>
                  {this.listAmigos.map((match)=>(
                    <List.Item>
                      <List.Content floated='right'>
                        <Checkbox onChange={this.handleChange} value={parseInt(match.id_user)}  />
                      </List.Content>
                      <Image avatar src={this.infoUsers[match.id_user].picture} />
                      <List.Content>
                        {this.infoUsers[match.id_user].name}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </div>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClickAcordion}>
              <Icon name='dropdown' />
              Agrega el Lugar donde se llevara a cabo tu cita!
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <div>
                  <List divided verticalAlign='middle' size={'massive'}>
                    <Form.Field>
                      Selected value: <b>{this.state.value}</b>
                    </Form.Field>
                  <Query query={GET_ALL_LUGARES}>
                    {({ alllugares }) => {
                      return alllugares.map(({ _id,nombre,nivelPrecio,ubicacion }) => (
                        <List.Item>
                          <List.Content floated='right'>
                            <Checkbox
                              radio
                              name='lugar'
                              value={_id}
                              checked={this.state.value === 'this'}
                              onChange={this.handleChangeRadio}
                            />
                          </List.Content>
                          <ModalViewLugar style={styles.inline} latlng={{'lat':ubicacion.coordinates[1],'lng':ubicacion.coordinates[0]}}/>

                          <List.Content style={styles.inline}>
                            {nombre}
                          </List.Content>
                        </List.Item>
                      ))
                    }}
                  </Query>
                </List>
              </div>
            </Accordion.Content>
          </Accordion>
          <Button primary type="submit">
            Crear <Icon name='plus' />
          </Button>
          </Form>

        )}
      </Mutation>

    )
  }
};

export default ModalNuevaCita
