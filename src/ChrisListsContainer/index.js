import React, { Component } from "react";
import { Nav, NavItem, NavLink, Navbar, ListGroup, ListGroupItem } from 'reactstrap';
import CreateFamily from  "../CreateFamily"
import CreatePresent from "../CreatePresent"
import PresentsList from "../PresentsList"
import ShowPresent from "../ShowPresent"

class ChrisListsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			families: [],
			userFamilies: null,
			family_members: [],
			createFamilyModalOpen: false,
			createFamily: {
				family_name: ""
			},
			presents: [],
			createPresent: {
				present_name: "" ,
				present_description: "",
				present_notes: "",
				present_price: ""
			},
			pageToView: ""
			// showingPresent: null // replace with present from array to show present
		}
	}
	componentDidMount() {
		this.getFamilies();
		this.getPresents();
		this.userFamilies();
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


			const userFamilies = parsedFamilies.data.map(family => {	
			return (
				<div key={family.id}>
					<ListGroup horizontal="lg">
						<ListGroupItem onClick={this.showFamily} tag="a" href="#">
							{family.family_id.family_name}
						</ListGroupItem>
					</ListGroup>
				</div>
			);
		});	
		this.setState({
			userFamilies: userFamilies,
			families: parsedFamilies.data
		});
		} catch (err) {
			console.log(err);
		}
	};

	// this displays the current users families on the index page
	userFamilies = () => {
		console.log("this is this.state.families");
		console.log(this.state.families);
		const userFamilies = this.state.families.map(family => {	
			return (
				<div key={family.id}>
					<ListGroup horizontal="lg">
						<ListGroupItem onClick={this.showFamily} tag="a" href="#">
							{family.family_id.family_name}
						</ListGroupItem>
					</ListGroup>
				</div>
			);
		});	
		this.setState({
			userFamilies: userFamilies
		})	
		
	}
	

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
			// create an object from parsedResponse.data w/ the same shape as the ones in state
			console.log("this is the parsedResponse.data:");
			console.log(parsedResponse.data);

			// build object here
			const familyToAdd = {
				family_id: {
						family_name: parsedResponse.data.family_name
					},	
			}

			this.setState({
				families: [
					...this.state.families, 
					familyToAdd // replace this with an obj that looks like the ones in state
				]
			});
			this.getFamilies();
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};

	// Show individual family

	showFamily = async (idOfFamily) => {
		console.log("this is the this.state.families:");
		console.log(this.state.families);
	}











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
	// Create a present for the current user, CAN"T USE IT, NEED TO BE HAVE A FAMILY_ID
	addPresent = async (e) => {
		e.preventDefault();
		try {	
			console.log(this.state.createPresent);
			const createdPresentResponse = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/presents/",
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify(this.state.createPresent),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const parsedResponse = await createdPresentResponse.json();
			console.log(parsedResponse, "this is the response");

			this.setState({
				presents: [
					...this.state.presents, 
					parsedResponse.data
				]
			});
			// this.getPresents();
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};

	// This deletes the current present of the current user (Can't test until family members are done)
	deletePresent = async (id) => {
		const deletePresentResponse = await fetch(
			process.env.REACT_APP_API_URL + "/api/v1/presents/" + id,
			{
				method: "DELETE",
				credentials: "include"
			}
		);
		const deletePresentParsed = await deletePresentResponse.json();
		
		this.setState({presents: this.state.presents.filter((present) => present.id !== id)});
	};

	showSelectedPresent = async (idOfPresent) => {
		console.log("this is the this.state.presents:");
		console.log(this.state.presents);

		// change state so that ShowPresent is displayed for the chosen present

		// look in this.state.presents for a present with that ID

		// put it in this.state.showingPresent

		// use a ternary to cause showingPresent to show up when that isn't ull
	}














	// -------------------Modal Open/Close & Handle Changes--------------------------------

	// handles the change for adding new a family for the current user.
	handleCreateFamilyChange = (e) => {
		e.preventDefault();
		this.setState({
			createFamily: {
				...this.state.createFamily,
				[e.target.name]: e.target.value
			}
		})
	}
	// handles the change for adding new a present for the current user.
	handleCreatePresentChange = (e) => {
		e.preventDefault();
		this.setState({
			createPresent: {
				...this.state.createPresent,
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
	// Opens Add Present Model
	createPresentModalOpen = () => {
		console.log("hitting the createPresentModalOpen");
		this.setState({
			createPresentModalOpen: true
		});

	};

	// Closes All Models 
	closeModal = () => {
		this.setState({
			createFamilyModalOpen: false,
			createPresentModalOpen: false
		});
	};
















	// -------------------Misc Functions--------------------------------------------------

	// this is the function to show the current users presents
	myPresents = (e) => {
		console.log("hitting the my presents button in the nav");
		e.preventDefault()
		this.setState({
			pageToView: "presents"
		})
	}

	myFamiliesContainer = (e) => {
		console.log("hitting the my myFamiliesContainer in the nav");
		e.preventDefault()
		this.setState({
			pageToView: "My Families"
		})
	}

	showAnIndividualFamily = (e) => {
		console.log("this is hitting the showAnIndividualFamily function");
		e.preventDefault()
		this.setState({
			pageToView: "Individual Family"
		})
	}

	
	render() {
		// I need to display my nav bar(CHECK) and 
		// I need to display the current users families they are related to (CHECK) and
		// I need to display their family members under each family
		
		return (
			<div>
				<h1>This is the Chris Lists Container</h1>
				<Navbar color="light" light expand="md">
				<Nav>
					{
						this.state.pageToView === "presents"
						?
						<NavItem>
				          <NavLink  disabled onClick={this.createPresentModalOpen} href="#">Add A Present</NavLink>
				        </NavItem>
				        :
				        <NavItem>
				          <NavLink onClick={this.createFamilyModalOpen} href="#">Add A Family</NavLink>
				        </NavItem>
					}
			        <NavItem>
			          <NavLink onClick={this.myFamiliesContainer}href="#">My Families</NavLink>
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
					handleCreateFamilyChange={this.handleCreateFamilyChange}
					closeModal={this.closeModal}
				   />
				   <CreatePresent
					open={this.state.createPresentModalOpen}
					addPresent={this.addPresent}
					handleCreatePresentChange={this.handleCreatePresentChange}
					closeModal={this.closeModal}
				   />
				
				   
			    </Navbar>
				{ /* show presentlist or nothing */ }
			    {
				   this.state.pageToView === "presents"
				   ?
				   <PresentsList
				   	families={this.state}
				   	currentUser={this.props.user}
				   	presents={this.state.presents}
				   	getPresents={this.getPresents}
				   	deletePresent={this.deletePresent}
				   	showPresent={this.showSelectedPresent}
				   />
		    		:
		    		null
			    }
			{ /* show familes or nothing */ }
			{ /* show ShowPresents or nothing */ }



			</div>
		);
	}
		
}

export default ChrisListsContainer