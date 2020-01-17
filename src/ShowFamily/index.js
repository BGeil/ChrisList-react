import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';



function ShowFamily (props) {
	let currentFamily = []

		if(props.family_members[0] !== 0) {
			currentFamily.push(		
		      	<ListGroup className="show-family-style">     
			        <ListGroupItem  className="show-family-style" tag="a">
			        	{props.family_members[0].map((family_member, i) => {
			        		return (
		        			<div className="show-family-member" key={i}><h4>{family_member.user_id.first_name.toUpperCase()}</h4>
		        				{props.family_members[1][i].map(present => <p key={present.id}>{present.present_name}</p>)}
		        				
			        		</div>
			        	)})}
			        </ListGroupItem>
		      </ListGroup>		    
			)			    
    	}			
	return(
		<React.Fragment>
			<h3 className="family-title">{props.family_members[0][0].family_id.family_name}</h3>
			{currentFamily}
		</React.Fragment>
	)
}
export default ShowFamily