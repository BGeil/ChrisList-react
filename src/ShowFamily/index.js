import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';



function ShowIndividualFamily (props) {
	console.log("this is the props in ShowIndividualFamily:");
	console.log(props);

		return (
			<div>
		      <ListGroup >       
		        <ListGroupItem tag="a">
		        	{props.family_members}        
		        </ListGroupItem>
		      </ListGroup>
		    </div>
		);
}






export default ShowIndividualFamily
