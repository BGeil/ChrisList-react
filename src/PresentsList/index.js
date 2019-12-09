import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
// import ShowPresent from '../ShowPresent'


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
		        <ListGroupItem tag="a" href="#" action>
		        	{present.present_name} --- {present.present_price}       
		        </ListGroupItem>
		      </ListGroup>
		    </div>


		);
	});
	return (
    	<div>
    	 <h3>My Presents </h3>
        	{ userPresents }
	    </div>
    )
}
export default PresentsList


// Not sure if I need to filter, justr leaving this here for now...

// const userPresents = props.presents.filter(present => present.user_id === props.currentUser.id && present.family_id === props.families.family_name)

	// console.log("this is userPresents:");
	// console.log(userPresents)

