import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Cards from './Cards';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "All Deals",
            subcategory: "",
            link: ""
        };
    }

    render() {
        return (
            <div >
                <Menu menuState={this.state.category} handleChange={this.handleChange} link={this.state.link} />
                <div className="container"  >
                    <h2 >{this.state.category}</h2>
                    <Cards items={this.state.items} category={this.state.category} subcategory={this.state.subcategory} link={this.state.link} />
                </div>
            </div>
        );
    }


    handleChange = (category) => {
        let categories = ["All Deals", "Beauty and Spas", "Health and Fitness", "All Deals"];
        if (categories.includes(category)) {
            this.setState({ category: category, subcategory: "" });

        } else {
            this.setState({ subcategory: category });
        }
    }
}

export default HomePage;