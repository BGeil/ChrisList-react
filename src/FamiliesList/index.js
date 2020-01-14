import React from 'react';
import ShowFamily from '../ShowFamily'
import { ListGroup, ListGroupItem } from 'reactstrap';


function FamiliesList (props) {
	const userFamilies = props.families.map(family => {	
	return (
		<div className="" key={family.id}>
			<ListGroup horizontal="lg">
				<ListGroupItem className="" onClick={() => props.showSelectedFamily(family.id)} tag="a" href="#">
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