import React, { Component } from 'react';
import Card from './Card';
import Data from '../../Data/Data';
import API from '../../Service/API';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleScroll = this.handleScroll.bind(this);


    }
    componentWillMount() {
        this.API = new API();
        this.API.getAllItems()
            .then(res => {
                this.APIData = res.items;
                this.setState({ data: res.items });
            });

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };



    render() {

        var filteredData = [];
        Data.items = this.state.data;
        console.log('category', this.props.category, 'subcategory', this.props.subcategory);

        if (this.props.subcategory) {
            filteredData = Data.items.filter(i => i.subcategory === this.props.subcategory);
        }
        else if (this.props.category !== "All Deals") filteredData = Data.items.filter(i => i.category === this.props.category);
        else filteredData = Data.items;
        // if (filteredData.length === 0) alert("no item for this category");



        return (
            <div className="row" onScroll={this.handleScroll}>
                {
                    //this.state.data
                    filteredData.map(function (item, index) {
                        return <Card
                            key={index}
                            id={item.companyid}
                            compnay={item.company}
                            imageurl={item.imageurl}
                            description={item.description}
                            price={item.price}
                            dprice={item.dprice}
                        />
                    })}
            </div>
        );
    }

    handleScroll = (e) => {
        //let bottom = e.target;
        //bottom = window.scrollY;
        // bottom = document.documentElement.scrollHeight;

    }

}
export default Cards;