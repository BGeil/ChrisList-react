import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


class CreateFamilyMember extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			results: null,
			searched: false // true when hear back
		}
	}

	handleChange = (e) => {
    e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleClick = (e) => {
    	e.preventDefault()
    	this.searchFamilyMember(this.state.query)
	}

	// Search for users to add to a  Family
	searchFamilyMember = async (query) => {
		try {
			const usersToFamilies = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/search/" + query,
				{
					credentials: "include"
				}
			);
			const parsedUserToFamilies = await usersToFamilies.json();
			this.setState({
				results: parsedUserToFamilies.data
			});
		} catch (err) {
			console.log(err);
		}	
	}

	render(){
		let currentResult = null
		if(this.state.results !== null) {
			currentResult = this.state.results.map(result => {
					return(
						<div key={result.id}>

						<span>Name:</span>{' '}{result.first_name}{' '}{result.last_name}{' '}
						<span>Age:</span>{' '}{result.age}{' '}
						<span>Place of Residence:</span>{' '}{result.place_of_residence}{' '}
						<Button size="sm" onClick={() => {this.props.addUsersToFamily({
							family_id: this.props.family_ID,
							user_id:result.id
						})
							}}>Add</Button>
						</div>
						)	
				})
		}
		return (
			 <div>
			      <Modal isOpen={this.props.open} >
			      <Form>
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
						    	<Button onClick={this.handleClick} type='Submit'>Search</Button>
						    </FormGroup>
							    	{currentResult}
				        </ModalBody>
				        <ModalFooter>
				          <Button color="secondary" onClick={this.props.closeModal}>Done</Button>
				        </ModalFooter>
			        </Form>
			      </Modal>
		    </div>
		)
	}
}
export default CreateFamilyMember