import React, { Component } from "react";
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import CreateFamily from  "../CreateFamily"
import CreatePresent from "../CreatePresent"
import CreateFamilyMember from "../CreateFamilyMember"
import FamiliesList from "../FamiliesList"
import PresentsList from "../PresentsList"
import ShowFamily from "../ShowFamily"
import ShowPresent from "../ShowPresent"
import EditPresent from "../EditPresent"

class ChrisListsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

			family_ID: null,
			pageToView: "My Families",
			families: [],
			family_members: [], // addFamilyMember pushes into here when it hears back
			createFamilyModalOpen: false,
			createFamilyMemberModalOpen: false,
			editModalOpen: false,
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
			presentToEdit: {
				present_name: "" ,
				present_description: "",
				present_notes: "",
				present_price: ""
			},
			showCurrentPresent: null,
			currentFamilyId: null
		}
	}
	componentDidMount() {
		this.getFamilies();
		this.getPresents();
	}
// ---------------------------------Families--------------------------------------------------------------

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




			console.log("parsedResponse >>>>>>>>>>>>>> THIAGO ", parsedResponse);
			console.log(parsedResponse.data.family);
			// build object here
			const familyToAdd = {
				family_id: {
						family_name: parsedResponse.data.family_name
						
					},	
			}

			this.setState({
				families: [
					...this.state.families, 
					familyToAdd 
				],
				family_ID: parsedResponse.data.family.id
			});
			this.getFamilies();
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};

	// Show individual family
	showSelectedFamily = async (id) => {
		try {
			const families = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/" + id,
				{
					credentials: "include"
				}
			);
			const parsedFamilies = await families.json();
			console.log("this is parsedFamilies in showSelectedFamily")
			console.log(parsedFamilies);
			this.setState({
				pageToView: "Individual Family",
				family_members: parsedFamilies.data,
				currentFamilyId: id
				
			});
		} catch (err) {
			console.log(err);
		}			
	}

	// Add Family Members
	addUsersToFamily = async (formInfo) => {

		console.log("this is the addUsersToFamily in formInfo:");
		console.log(formInfo);
		try {
			
			
			const addUsersToFamilyResponse = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/add_member",
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify(formInfo),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const parsedResponse = await addUsersToFamilyResponse.json();
			console.log("this is parsed Response in addUsersToFamily")
			console.log(parsedResponse)
			console.log('\nthis is this.state.family_members before new member is added');
			console.log(this.state.family_members);
			this.setState({
				family_members: [
					...this.state.family_members,
					parsedResponse.data	
				],
			});
			console.log('\nthis is this.state.family_members after new member is added');
			console.log(this.state.family_members);
			this.showSelectedFamily(formInfo.family_id);
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};





// ----------------------------------------Presents----------------------------------------------------

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

	// Show One Present
	showSelectedPresent = async (idOfPresent) => {
		console.log("this is the this.state.presents:");
		console.log(this.state.presents);
		console.log("this is idOfPresent:");
		console.log(idOfPresent);
		// this.setState({
			// change state so that ShowPresent is displayed for the chosen present

			// look in this.state.presents for a present with that ID

			// put it in this.state.showCurrentPresent

			// use a ternary to cause showPresent to show up when that isn't null
		// })
	}



	// Create a present for the current user, CAN'T USE IT, NEED TO BE HAVE A FAMILY_ID
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
			this.closeModal();
		} 
		catch (err) {
			console.log(err);
		}
	};

	// Edit a Present
	editPresent = (idOfPresent) => {
		console.log("this is the edit present route getting hit");
		const presentToEdit = this.state.presents.find(
			present => present.id === idOfPresent
		);
		this.setState({
			editModalOpen: true,
			presentToEdit: presentToEdit
		});
	};

	// Update a Present
	updatePresent = async (e) => {
		e.preventDefault();
		const body = {
			present_name: this.state.presentToEdit.present_name,
			present_description: this.state.presentToEdit.present_description,
			present_notes: this.state.presentToEdit.present_notes,
			present_price: this.state.presentToEdit.present_price
		}
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/presents/" + this.state.presentToEdit.id
			const updateResponse = await fetch(url, {
				method: "PUT",
				credentials: "include",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const updateResponseParsed = await updateResponse.json();
			const newPresentsArrayWithUpdate = this.state.presents.map(
				(present) => {
					if (present.id === updateResponseParsed.data.id) {
						present = updateResponseParsed.data;
					}
					return present;
				}
			);
			this.setState({
				presents: newPresentsArrayWithUpdate
			});
			this.closeModal();
		} catch (err) {
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



// ----------------------Modal Open/Close & Handle Changes----------------------------------------

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

	// handles the change for adding new a family for the current user.
	handleCreateFamilyMemberChange = (e) => {
		e.preventDefault();
		this.setState({
			createFamily: {
				...this.state.createFamilyMember,
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
	// handles the change for editing a present for the current user.
	handleEditPresentChange = (e) => {
		e.preventDefault();
		this.setState({
			presentToEdit: {
				...this.state.presentToEdit,
				[e.target.name]: e.target.value
			}
		});
	};

	// Opens Add Family Model
	createFamilyModalOpen = () => {
		console.log("hitting the createFamilyModalOpen");
		this.setState({
			createFamilyModalOpen: true
		});

	};

	// Opens Add Family Member Model
	createFamilyMemberModalOpen = () => {
		console.log("hitting the createFamilyMemberModalOpen");
		this.setState({
			createFamilyMemberModalOpen: true
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
			createPresentModalOpen: false,
			createFamilyMemberModalOpen: false,
			editModalOpen: false
		});
	};
// -------------------------------Misc Functions--------------------------------------------------

	// this is the function to show the current users presents
	myPresentsList = (e) => {
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

	showAnIndividualPresent = (e) => {
		console.log("this is hitting the showAnIndividualPresent function");
		e.preventDefault()
		this.setState({
			pageToView: "Individual Present"
		})
	}

	render() {	
		return (
			<div>
				<header className="header-style">
            	<h1 className="text-center">
		           The Chris List
	            </h1>
	            <h2 className="text-center">
	            	A Christmas Present Manager
	            </h2>
	            </header>
				<Navbar className="nav-bar" >
				<Nav>
				  {
						this.state.pageToView === "presents"
						?
							<NavItem>
					          <NavLink  className="nav-link" onClick={this.createPresentModalOpen} href="#">Add A Present</NavLink>
					        </NavItem>
				        :
					        null
					}
					{
						this.state.pageToView === "Individual Family"
						?
						<NavItem>
				          <NavLink  onClick={this.createFamilyMemberModalOpen} href="#">Add A Family Member</NavLink>
				        </NavItem>
						:
						null
				    }
				    {
					    this.state.pageToView === "My Families"
					    ?
					     <NavItem>
				          <NavLink onClick={this.createFamilyModalOpen} href="#">Add A Family</NavLink>
				         </NavItem>
				         :
				         null
				    }
			        <NavItem>
			          <NavLink onClick={this.myFamiliesContainer}href="#">My Families</NavLink>
			        </NavItem>
			        <NavItem>
			          <NavLink onClick={this.myPresentsList} href="#">My Presents</NavLink>
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
				   <CreateFamilyMember 
				   		open={this.state.createFamilyMemberModalOpen}
				   		searchFamilyMember={this.searchFamilyMember}
				   		closeModal={this.closeModal}
				   		currentFamilyId={this.state.currentFamilyId}
				   		addUsersToFamily={this.addUsersToFamily}
				   		family_ID={this.state.family_ID}
				   />
			       <EditPresent
						open={this.state.editModalOpen}
						updatePresent={this.updatePresent}
						presentToEdit={this.state.presentToEdit}
						closeModal={this.closeModal}
						handleEditPresentChange={this.handleEditPresentChange}
					/>
				  
			    </Navbar>
			    {	/* show presentlist or nothing */
				   this.state.pageToView === "presents"
				   ?
				   <PresentsList
					   	
					   	currentUser={this.props.user}
					   	presents={this.state.presents}
					   	getPresents={this.getPresents}
					   	editPresent={this.editPresent}
					   	handleEditPresentChange={this.handleEditPresentChange}
					   	deletePresent={this.deletePresent}
					   	showSelectedPresent={this.showSelectedPresent}
				   />  	
		    		:
		    		null
			    }
				{ /* show familes or nothing */ 
					this.state.pageToView === "My Families"
					?
					<FamiliesList
						currentUser={this.props.user}
						families={this.state.families}
						getFamilies={this.getFamilies}
						showSelectedFamily={this.showSelectedFamily}
						searchFamilyMember={this.searchFamilyMember}
					/>
					:
					null

				}
				 {  /* show ShowPresent or nothing */ 
					this.state.pageToView === "Individual Present"
					?
					<ShowPresent 
						currentUser={this.props.user}
					   	presents={this.state.presents}
					   	getPresents={this.getPresents}
					   	deletePresent={this.deletePresent}
					   	showSelectedPresent={this.showSelectedPresent}
					/>
					:
					null
				}
				{  /* show ShowFamily or nothing */ 
					this.state.pageToView === "Individual Family" 
					?
					<ShowFamily 
						currentUser={this.props.user}
						family_members={this.state.family_members}
						currentFamilyId={this.state.currentFamilyId}
				   		addUsersToFamily={this.addUsersToFamily}
						showSelectedFamily={this.showSelectedFamily}
					/>
					:
					null
				}

			</div>
		);
	}		
}
export default ChrisListsContainer

