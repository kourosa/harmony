import React, { Component } from "react";

class Submenu extends Component {
    render() {
        if (this.props.item === "All Deals")
            return (
                <div className="subnav">
                    <ul>
                        <li> <a href="/Category/DayDeal" >Deals of the Day</a></li>
                        <li><a href="/Category/Featured">Featured</a> </li>
                        <li> <a href="#" onClick={() => { this.props.onSubMenuClick("Best Discount") }}>Best Discount</a></li>
                        <li><a href="/Category/New Deals">New Deals</a></li>
                        <li><a href="/Category/Best Sellers">Best Sellers</a></li>
                        <li> <a href="/Category/Most Viewed">Most Viewed</a> </li>
                    </ul>
                </div>)
        if (this.props.item === "Beauty & Spas")
            return (
                <div className="subnav">
                    <ul>
                        <li><a href="/Category/Beauty and Spas" onClick={(e) => { e.preventDefault(); this.props.onSubMenuClick("Hair Color") }}>Hair Color</a> </li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("Hair Style") }}>Hair Style</a></li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("Nails") }}>Nails</a></li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("Face and Skin") }}>Face & Skin</a></li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("MakeUp") }}>MakeUp</a></li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("Hair Removal") }}>Hair Removal</a></li>
                        <li><a href="#" onClick={() => { this.props.onSubMenuClick("Spa and Massage") }}>Spa & Massage</a></li>
                    </ul>
                </div>
            )

        if (this.props.item === "Health & Fitness")
            return (
                <div className="subnav">
                    <ul>
                        <li>
                            <a href="/">Gyms</a>
                        </li>
                        <li>
                            <a href="/">Sports</a>
                        </li>
                        <li>
                            <a href="/">Vision</a>
                        </li>
                        <li>
                            <a href="/">Dental</a>
                        </li>
                        <li>
                            <a href="/">Medical</a>
                        </li>
                        <li>
                            <a href="/">Yoga & Meditation</a>
                        </li>
                        <li>
                            <a href="/">Other</a>
                        </li>
                    </ul>
                </div>)

        else return null;


    }
}

export default Submenu;