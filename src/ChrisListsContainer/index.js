import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import CreateFamily from  "../CreateFamily"

class ChrisListsContainer extends Component {
	constructor() {
		super();
		this.state = {
			families: [],
			family_members: [],
			createFamilyModalOpen: false,
			createFamily: {
				family_name: ""
			}
		}
	}
	componentDidMount() {
		this.getFamilies();
	}

	// Grabs all the families the current logged in user is realted to.
	getFamilies = async () => {
		try {
			const families = await fetch(
				process.env.REACT_APP_API_URL + "/api/v1/families/",
				{
					credentials: "include"
				}
			);
			const parsedFamilies = await families.json();
			console.log(parsedFamilies);
			this.setState({
				families: parsedFamilies.data
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Creates A Fmaily and adds the current user to the family
	addFamily = async (e) => {
		e.preventDefault();
		console.log(this.state.createFamily);
		try {
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




	render() {
		// I need to display my nav bar (react router) and 
		// I need to display the current users families they are related to and
		// I need to display their family members under each family
		return (
		<div>
			This is the Chris Lists Container
			<CreateFamily
				open={this.state.createFamilyModalOpen}
				addFamily={this.addFamily}
				handleCreateChange={this.handleCreateChange}
				closeModal={this.closeModal}
			/>
			<button onClick={this.createFamilyModalOpen}>Add a Family</button>

		</div>
		);
	}
		
}

export default ChrisListsContainer


// function Home() {
// 	  return <h2>Home</h2>;
// 	}

// 	 <Router>
// 	      <div>
// 	        <nav>
// 	          <ul>
// 	            <li>
// 	              <Link to="/">Home</Link>
// 	            </li>
// 	          </ul>
// 	        </nav>

// 	        { A <Switch> looks through its children <Route>s and
// 	            renders the first one that matches the current URL. }
// 	        <Switch>
// 	          <Route path="/about">
// 	            <About />
// 	          </Route>
// 	          <Route path="/users">
// 	            <Users />
// 	          </Route>
// 	          <Route path="/">
// 	            <Home />
// 	          </Route>
// 	        </Switch>
// 	      </div>
// 	    </Router>














