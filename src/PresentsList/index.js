import React from 'react';
import ShowPresent from '../ShowPresent'
import { Button, ListGroup, ListGroupItem, Label } from 'reactstrap';


function PresentsList(props) {
	if (props.presents === []) {
		console.log("we're getting presents");
		props.getPresents();
	}
	
	console.log("this is the props of PresentsList");
	console.log(props);
	console.log("this is the props.presents:");
	console.log(props.presents);
			
	const userPresents = props.presents.map(present => {
		
		return (
			<div key={present.id}>
		      <ListGroup >       
		        <ListGroupItem onClick={() => props.showSelectedPresent(present.id)} tag="a" href="#" action>
		        	<Label>Item: </Label>
		        	 {present.present_name}<br/>
		        	<Label>Description: </Label>
				     {present.present_description}<br/>
				    <Label>Additional Notes :</Label>
				     {present.present_notes}<br/>
				    <Label>Price: </Label>
				     {present.present_price}<br/>
		        	<Button color="secondary" size="sm" onClick={() => props.editPresent(present.id)}>Edit Present</Button>{' '}
		        	<Button color="danger" size="sm" onClick={() => props.deletePresent(present.id)}>Delete Present</Button>
		        </ListGroupItem>
		      </ListGroup>
		    </div>
		);
	});
	return (
    	<div>
    	 <h4>My Presents</h4>
        	{ userPresents }
	    </div>
    )
}
export default PresentsList

// <ListGroupItem onClick={() => props.showSelectedPresent(present.id)} tag="a" href="#" action>
