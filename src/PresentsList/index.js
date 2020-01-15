import React from 'react';
import ShowPresent from '../ShowPresent'
import { Button, ListGroup, ListGroupItem, Label } from 'reactstrap';


function PresentsList(props) {
	if (props.presents === []) {
		props.getPresents();
	}		
	const userPresents = props.presents.map(present => {
		
		return (
			<div key={present.id}>
		      <ListGroup className="presents">       
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
    	 <h4 className="family-title">My Presents</h4>
        	{ userPresents }
	    </div>
    )
}
export default PresentsList

// <ListGroupItem onClick={() => props.showSelectedPresent(present.id)} tag="a" href="#" action>
