import React, { Component } from "react";
import Submenu from './Submenu';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuState: "All Deals",
            subMenuState: "Deal of Day",
            mobileMenu: true
        };
        this.handleSignout = this.handleSignout.bind(this);
        this.handleMenuClicked = this.handleMenuClicked.bind(this);
        this.handleSubMenuClicked = this.handleSubMenuClicked.bind(this);
    }

    componentDidMount() {
        if (document.documentElement.clientWidth < 500) {
            this.setState({ mobileMenu: false });
        }

    }

    render() {

        return (
            <Router>
                <div >
                    <div className="toplogo">
                        <a href="/"><h1>PONPON</h1></a>
                        <input type="text" placeholder="Search Harmony" />
                        <ul>
                            <li key="iconitem" className="icon" onClick={() => { this.handleMenuClicked() }}><i className="fa fa-bars"></i>  </li>
                            <li>
                                {localStorage.getItem('jwt') ?
                                    <div>
                                        <a href="/" key="signout" name="signout" onClick={this.handleSignout}> Sign Out <i className="fas fa-sign-in-alt"></i></a>
                                        <a href="/profile" key="profile" name="signout" > Profile </a>

                                    </div> :
                                    <a href="/Welcome" > Sign in <i className="fas fa-sign-in-alt"></i></a>}
                            </li>
                        </ul>
                    </div>

                    <div className="topnav" style={{ display: this.state.mobileMenu ? 'block' : 'none' }}>
                        <ul>
                            <li >
                                <Link to="/"
                                    onClick={() => { this.props.handleChange("All Deals"); }}
                                    onMouseEnter={() => { this.setState({ menuState: "All Deals" }) }}
                                >All Deals</Link>
                            </li>
                            <li >
                                <Link to="/Category/Beauty and Spas"
                                    onClick={() => { this.props.handleChange("Beauty and Spas") }}
                                    onMouseEnter={() => { this.setState({ menuState: "Beauty & Spas" }) }}
                                >Beauty & Spas</Link>
                            </li>
                            <li>
                                <Link to="/Category/Health and Fitness"
                                    onClick={() => { this.props.handleChange("Health and Fitness") }}
                                    onMouseEnter={() => { this.setState({ menuState: "Health & Fitness" }) }}
                                >Health & Fitness</Link>
                            </li>
                            <li>
                                <Link to="/Category/Fun and Leisure">Fun & Leisure </Link>
                            </li>
                            <li>
                                <Link to="/">Gift & Flowers</Link>
                            </li>
                            <li>
                                <Link to="/">Food & Drink</Link>
                            </li>
                        </ul>

                    </div>
                    {this.state.mobileMenu ? <Submenu item={this.state.menuState} onSubMenuClick={(subcategory) => { this.handleSubMenuClicked(subcategory) }} /> : null}
                </div>
            </Router >
        );
    }

    handleSignout() { localStorage.removeItem('jwt'); }
    handleMenuClicked() {
        this.setState({ mobileMenu: !this.state.mobileMenu });
    }
    handleSubMenuClicked(subcategory) {
        this.setState({ subMenuState: subcategory });
        console.log('subcategory', subcategory);
        this.props.handleChange(subcategory);
    }
}


export default Menu;
