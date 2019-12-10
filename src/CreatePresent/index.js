import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


function CreatePresent(props) {

	return (
		 <div>
		      <Modal isOpen={props.open} >
		      <Form onSubmit={props.addPresent}>
			        <ModalHeader>Add a present to Chris List!</ModalHeader>
			        <ModalBody>
			        	 <FormGroup>
					        <Label for="present_name">Present Name:</Label>
					        <Input type="text" name="present_name" id="present_name" value={props.present_name}
				                onChange={props.handleCreatePresentChange}/>

				             <Label for="present_description">Present Description:</Label>
			                <Input type="text" name="present_description" id="present_description" value={props.present_description}
			                onChange={props.handleCreatePresentChange}/>

			                <Label for="present_price">Present Price:</Label>
			                <Input type="text" name="present_price" id="present_price" value={props.present_price}
			                onChange={props.handleCreatePresentChange}/>
			                <Label for="present_notes">Any notes additional your family should know about the present:</Label>
			                <Input type="textarea" name="present_notes" id="present_notes" value={props.present_notes}
			                onChange={props.handleCreatePresentChange}/>
					      </FormGroup>
			        </ModalBody>
			        <ModalFooter>
			          <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
			          <Button color="primary" type='Submit'>Add a Present</Button>
			        </ModalFooter>
		        </Form>
		      </Modal>
	    </div>
		)
}
export default CreatePresent