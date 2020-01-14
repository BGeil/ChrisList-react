import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';



function ShowFamily (props) {
	let currentFamily = []
	let theFamilyName = ""

		if(props.family_members[0] !== 0) {
			currentFamily.push(		
		      	<ListGroup>     
			        <ListGroupItem tag="a">
			        	{props.family_members[0].map((family_member, i) => {
			        		return (
		        			<div key={i}><h3>{family_member.user_id.first_name.toUpperCase()}</h3>
		        				{props.family_members[1][i].map(present => <p key={present.id}>{present.present_name}</p>)}
		        				<hr/>
			        		</div>
			        	)})}
			        </ListGroupItem>
		      </ListGroup>		    
			)			    
    	}			
	return(
		<React.Fragment>
			<h1>{props.family_members[0][0].family_id.family_name}</h1>
			{currentFamily}
		</React.Fragment>
	)
}
export default ShowFamily