import React, { Component } from 'react';
import '../../profile.css';
import API from '../../Service/API';


class Coupons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons: []
        };

    }



    render() {
        return (
            <div className="pcard">
                <div className="card-header">
                    Your Certificates
                        </div>
                <div className="container" id="guide">
                    <div className="grouplist">
                        <ul>
                            {this.state.coupons.map(function (item, index) {
                                return (
                                    <li key={index} ><h3>Certificate No. : {this.couponNumber(item.userid, item.userid, item.expiry)}</h3>
                                        <p>
                                            <span> <strong>Company Provided: </strong></span>
                                            <span> {item.company} </span>
                                        </p>
                                        <p>
                                            <span> <strong>Service Description: </strong></span>
                                            <span> {item.description} </span>
                                        </p>
                                        <p>
                                            <span> <strong>Original Price: </strong></span>
                                            <span> {item.price} &nbsp;&nbsp;</span>
                                            <span> <strong>Discount Price: </strong></span>
                                            <span> {item.dprice} </span>
                                        </p>
                                        <p>
                                            <span> <strong> Bought at: </strong></span>
                                            <span> {item.datecreated} &nbsp;&nbsp;</span>
                                            <span> <strong> Expire at: </strong></span>
                                            <span> {item.expiry} </span>
                                        </p>
                                    </li>

                                );
                            }, this)}

                        </ul>
                    </div>

                </div>
            </div>
        );
    }



}

export default Coupons;