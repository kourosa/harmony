import React, { Component } from 'react';
class Card extends Component {
    render() {
        return (
            <div className="col-4 col-s-4">
                <div className="card">
                    <a href={"/item/" + this.props.id}>
                        <div className="imagediv">
                            <img src={this.props.imageurl} alt={this.props.id} width="100%" height="auto" />
                        </div>
                        <div className="textdiv">
                            <span className="discount-block">{Math.floor((this.props.price - this.props.dprice) / this.props.price * 100)}%</span>
                            <h2>{this.props.compnay} </h2>
                            <p>{this.props.description}</p>
                        </div>

                        <p><span className="carddprice"> {this.props.dprice} </span><span className="cardprice">{this.props.price} </span></p>
                    </a>
                </div>
            </div>
        );
    }
}
export default Card;