import React from 'react'
import { Button, Header, Icon, Modal , Form} from 'semantic-ui-react'


const ModalEditarGusto = ({value}) => (

  <Modal trigger={<Button circular color='blue' icon='write' />}>
    <Modal.Header>Editar gusto</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>

)

export default ModalEditarGusto
