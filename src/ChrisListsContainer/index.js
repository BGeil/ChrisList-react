import React, { Component } from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import CreateFamily from  "../CreateFamily"
import PresentsList from "../PresentsList"

class ChrisListsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			families: [],
			family_members: [],
			createFamilyModalOpen: false,
			createFamily: {
				family_name: ""
			},
			presents: [],
			createPresent: {

			},
			pageToView: ""
		}
	}
	componentDidMount() {
		this.getFamilies();
		this.getPresents();
	}

	// -------------------Families----------------------------------------------

	// Grabs all the families the current logged in user is related to.
	getFamilies = async () => {
		try {
			const families = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/",
				{
					credentials: "include"
				}
			);
			const parsedFamilies = await families.json();
			console.log("this is the parsedFamilies in the getFamilies route");
			console.log(parsedFamilies);
			console.log("this is the families in state:");
			console.log(this.state.families);
			this.setState({
				families: parsedFamilies.data
			});
		} catch (err) {
			console.log(err);
		}
	};
	

	// Creates A Family and adds the current user to the family
	addFamily = async (e) => {
		e.preventDefault();
		
		try {
			
			console.log(this.state.createFamily);
			const createdFamilyResponse = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/",
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify(this.state.createFamily),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const parsedResponse = await createdFamilyResponse.json();
			console.log("this is the parsedResponse in the addFamily route:");
			console.log(parsedResponse, "this is the response");
			this.setState({
				families: [
				...this.state.families, 
				parsedResponse.data
				]
			});
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};



	// -------------------Presents----------------------------------------------------

	// Grabs all the presents the current logged in user is related to.
	getPresents = async () => {
		try {
			const presents = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/presents/",
				{
					credentials: "include"
				}
			);
			const parsedPresents = await presents.json();
			console.log("this is the presents array in the getPresents route");
			console.log(parsedPresents);
			this.setState({
				presents: parsedPresents.data
			});
		} catch (err) {
			console.log(err);
		}
	};




	// -------------------Modal Open/Close & Handle Changes--------------------------------

	// handles the change for adding new a family for current user.
	handleCreateChange = (e) => {
		e.preventDefault();
		this.setState({
			createFamily: {
				...this.state.createFamily,
				[e.target.name]: e.target.value
			}
		})
	}


	// Opens Add Family Model
	createFamilyModalOpen = () => {
		console.log("hitting the createFamilyModalOpen");
		this.setState({
			createFamilyModalOpen: true
		});

	};

	// Closes All Models 
	closeModal = () => {
		this.setState({
			createFamilyModalOpen: false
		});
	};


	//this is the function to show the current users presents
	myPresents = (e) => {
		console.log("hitting the my presents button in the nav");
		e.preventDefault()
		this.setState({
			pageToView: "presents"
		})
	}




	render() {
		// I need to display my nav bar and 
		// I need to display the current users families they are related to and
		// I need to display their family members under each family
		return (
			<div>
				<h1>This is the Chris Lists Container</h1>
				<Nav>
					{
						this.state.pageToView === "presents"
						?
						<NavItem>
				          <NavLink href="#">Add A Present</NavLink>
				        </NavItem>
				        :
				        <NavItem>
				          <NavLink onClick={this.createFamilyModalOpen}>Add A Family</NavLink>
				        </NavItem>
					}
			        <NavItem>
			          <NavLink href="#">My Families</NavLink>
			        </NavItem>
			        <NavItem>
			          <NavLink onClick={this.myPresents} href="#">My Presents</NavLink>
			        </NavItem>
			        <NavItem>
			          <NavLink onClick={this.props.logout} href="#">logout</NavLink>
			        </NavItem>
			      </Nav>
				  <CreateFamily
					open={this.state.createFamilyModalOpen}
					addFamily={this.addFamily}
					handleCreateChange={this.handleCreateChange}
					closeModal={this.closeModal}
				   />
				   {
					   this.state.pageToView === "presents"
					   ?
						   <PresentsList
						   	families={this.state}
						   	currentUser={this.props.user}
						   	presents={this.state.presents}
						   	getPresents={this.getPresents}
						   />
					   :
						   null
				   }
			</div>
		);
	}
		
}

export default ChrisListsContainer



		
				



