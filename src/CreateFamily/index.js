import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


function CreateFamily(props) {
	return (
		 <div>
		      <Modal isOpen={props.open} >
		      <Form onSubmit={props.addFamily}>
			        <ModalHeader>Add A Family</ModalHeader>
			        <ModalBody>
			        	 <FormGroup>
					        <Label  for="family_name">Add a Family to Chris List!</Label>
					        <Input type="text" name="family_name" id="family_name" value={props.family_name}
				                onChange={props.handleCreateFamilyChange}/>
					      </FormGroup>
			        </ModalBody>
			        <ModalFooter>
			          <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
			          <Button color="danger" type='Submit'>Add a Family</Button>
			        </ModalFooter>
		        </Form>
		      </Modal>
	    </div>
		)
}
export default CreateFamily