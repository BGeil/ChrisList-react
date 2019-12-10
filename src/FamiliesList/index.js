import React from 'react';
import ShowIndividualFamily from '../ShowIndividualFamily'
import { ListGroup, ListGroupItem } from 'reactstrap';


function FamiliesList (props) {
	const userFamilies = props.families.map(family => {	
	return (
		<div key={family.id}>
			<ListGroup horizontal="lg">
				<ListGroupItem onClick={props.showFamily} tag="a" href="#">
					{family.family_id.family_name}
				</ListGroupItem>
			</ListGroup>
		</div>
		);
	});
	return (
    	<div>
    	 <h3>My Presents </h3>
        	{ userFamilies }
	    </div>
	)
}
export default FamiliesList