import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function EditPresent (props) {
	return(
		<div>
		      <Modal isOpen={props.open} >
		      <Form onSubmit={props.updatePresent}>
			        <ModalHeader>Edit Present</ModalHeader>
			        <ModalBody>
			        	 <FormGroup>
					        <Label for="present_name">Present Name:</Label>
					        <Input type="text" name="present_name" id="present_name" 
					        	value={props.presentToEdit.present_name}
				                onChange={props.handleEditPresentChange}/>

				             <Label for="present_description">Present Description:</Label>
			                <Input type="text" name="present_description" id="present_description" 
			                	value={props.presentToEdit.present_description}
			                	onChange={props.handleEditPresentChange}/>

			                <Label for="present_price">Present Price:</Label>
			                <Input type="text" name="present_price" id="present_price" 
				                value={props.presentToEdit.present_price}
				                onChange={props.handleEditPresentChange}/>
			                <Label for="present_notes">Any notes additional your family should know about the present:</Label>
			                <Input type="textarea" name="present_notes" id="present_notes" 
				                value={props.presentToEdit.present_notes}
				                onChange={props.handleEditPresentChange}/>
					      </FormGroup>
			        </ModalBody>
			        <ModalFooter>
			          <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
			          <Button color="primary" type='Submit'>Update Present</Button>
			        </ModalFooter>
		        </Form>
		      </Modal>
	    </div>
		)
}

export default EditPresent