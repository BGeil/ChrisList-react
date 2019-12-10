import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';



function ShowIndividualFamily (props) {
	
	console.log("this is the props in ShowIndividualFamily:");
	console.log(props);
	const folks = props.family_members.map((person) => {
		return (
			<div key={person.user_id}>
		      	<ListGroup>     
			        <ListGroupItem tag="a">
			        	{person.user_id.first_name}
			        </ListGroupItem>
		      </ListGroup>
		    </div>
		);		
	})
	return(
		<React.Fragment>
			<h1>This Is the Individual Family Page</h1>
			{folks}
		</React.Fragment>
	)
}
export default ShowIndividualFamily