import React from 'react';
import ShowFamily from '../ShowFamily'
import { ListGroup, ListGroupItem } from 'reactstrap';


function FamiliesList (props) {
	console.log("this is the props of familiesList:");
	console.log(props);
	const userFamilies = props.families.map(family => {	
	return (
		<div key={family.id}>
			<ListGroup horizontal="lg">
				<ListGroupItem onClick={() => props.showSelectedFamily(family.id)} tag="a" href="#">
					{family.family_id.family_name}
				</ListGroupItem>
			</ListGroup>
		</div>
		);
	});
	return (
    	<div>
        	{ userFamilies }
	    </div>
	)
}
export default FamiliesList