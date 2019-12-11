import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


class CreateFamilyMember extends Component {
	constructor(props) {
		console.log('\nthis is props in CreateFamilyMember');
		console.log(props);
		super(props);
		this.state = {
			query: '',
			results: [],
			searched: false // true when hear back
		}
	}

	handleChange = (e) => {
    e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render(){
		return (
			 <div>
			      <Modal isOpen={this.props.open} >
			      <Form onSubmit={(e) => this.props.searchFamilyMember(e, this.state.query)}>
				        <ModalHeader>Add Family Member</ModalHeader>
				        <ModalBody>
				        	 <FormGroup>
						        
						        <Label for="exampleSearch">Search</Label>
						        <Input
						          type="search"
						          name="query"
						          id="exampleSearch"
						          value={this.state.query}
						          onChange={this.handleChange}
						          placeholder="search for users"
						        />
						    	<Button type='Submit'>Search</Button>
						      </FormGroup>
						       <FormGroup check>
							        <Label check>
							          <Input type="checkbox" />{' '}
							          Check this to add this user to the family
							        </Label>
						      </FormGroup>
				        </ModalBody>
				        <ModalFooter>
				          <Button color="secondary" onClick={this.props.closeModal}>Cancel</Button>
				          <Button color="primary" type='Submit'>Submit</Button>
				        </ModalFooter>
			        </Form>
			      </Modal>
		    </div>
		)
	}
}
export default CreateFamilyMember



 // <Label for="family_name">Add a Family Member to Your Family</Label>
	// 				        <Input type="text" name="family_name" id="family_name" value={props.family_name}
	// 			                onChange={props.handleCreateFamilyMemberChange}/>