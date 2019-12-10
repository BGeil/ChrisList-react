import React from 'react'



function ShowIndividualFamily (props) {
	console.log("this is the props in ShowIndividualFamily:");
	console.log(props);
	const familyMembers = props.families.map(familyMember => {
		
		return (
			<div key={familyMember.id}>
		      <ListGroup >       
		        <ListGroupItem tag="a">
		        	{familyMember.user_id}        
		        </ListGroupItem>
		      </ListGroup>
		    </div>


		);
	});
	return (
    	<div>
    	 <h3> My family name goes here</h3>
        	{ familyMembers }
	    </div>
    )
}
}





export default ShowIndividualFamily
