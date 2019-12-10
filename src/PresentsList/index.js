import React from 'react';
import ShowPresent from '../ShowPresent'
import { Button, ListGroup, ListGroupItem } from 'reactstrap';


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
		        <ListGroupItem onClick={() => props.showPresent(present.id)} tag="a" href="#" action>
		        	{present.present_name} --- {present.present_price} <br/>  
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

// <Button color="primary" size="sm" onClick={() => props.deletePresent(present.id)}>Delete Present</Button>


    
// Not sure if I need to filter, just leaving this here for now...

// const userPresents = props.presents.filter(present => present.user_id === props.currentUser.id && present.family_id === props.families.family_name)

	// console.log("this is userPresents:");
	// console.log(userPresents)

