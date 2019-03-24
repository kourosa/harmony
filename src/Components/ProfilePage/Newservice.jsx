import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Newservice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            subcategory: "",
            description: "",
            price: "",
            dprice: "",
            deadline: "",
            discount: "",
            expiry: "",
            days: "",
            imageurl: "",
            rate: "",
            saved: true,
            validate: false,
            changed: false,
            subcategoryAlert: "",
            descriptionAlert: "",
            priceAlert: "",
            dpriceAlert: "",
            daysAlert: "",
            addNewService: false,

        }

        this.state = this.props.service;

        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
        this.handleChangedPrice = this.handleChangedPrice.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.handleChangedDate = this.handleChangedDate.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.serviceValidation = this.serviceValidation.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.handleChangedExpiry = this.handleChangedExpiry.bind(this);


    }

    componentWillReceiveProps(props) {


    }

    componentDidMount() {

        this.setState(this.props.service, () => {
            if (this.state.expiry) {
                let today = new Date().valueOf();
                let mySQLDate = this.state.expiry;
                let expiry = new Date(Date.parse(mySQLDate.replace('-', '/', 'g'))).valueOf();
                let days = Math.floor((expiry - today) / 86400000) + 1;
                this.setState({ days: days });
            }
            else {
                //
            }
            if (this.state.dprice && this.state.dprice) {
                let discount = Math.floor((this.state.price - this.state.dprice) / this.state.price * 100);
                this.setState({ discount: discount });
            }

        });

        for (let x in this.refs) {
            this.refs[x].onkeypress = (event) =>
                this._handleKeyPress(event, x);
        }
    }

    render() {
        return (
            <form className="DiscountCard">
                <div className="input-group">
                    <div className="input-group-title">Sub-Category*</div>
                    <div><select id="soflow" value={this.state.subcategory} onChange={this.handleChangeSubCategory} ref={"1"}>
                        <option></option>
                        <option>Hair Style</option>
                        <option>Hair Color</option>
                        <option>Nails</option>
                        <option>Face and Skin</option>
                        <option>MakeUp</option>
                        <option>Hair Removal</option>
                        <option>Spa and Massage</option>
                        <option>Other</option>
                    </select>
                    </div>
                </div>
                <span className="input-group-alert" >{this.state.subcategoryAlert} </span>

                <div className="input-group">
                    <div className="input-group-title">Description*</div>
                    <div className="input-group-area"><input type="text" value={this.state.description} onChange={this.handleChangeDescription} ref={"2"} /> </div>
                </div>
                <span className="input-group-alert" >{this.state.descriptionAlert} </span>

                <div className="input-group">
                    <div className="input-group-title">Original Price*</div>
                    <div className="input-group-area"><input type="number" value={this.state.price} onChange={this.handleChangePrice} ref={"3"} /> </div>
                </div>
                <span className="input-group-alert" >{this.state.priceAlert} </span>

                <div className="input-group">
                    <div className="input-group-title">Discounted Price*</div>
                    <div className="input-group-area"><input type="number" value={this.state.dprice} onChange={this.handleChangedPrice} placeholder="optional - The more discount you put, you have higher chance to be seen in website" ref={"4"} /> </div>
                </div>
                {(this.state.dprice && this.state.price) ?
                    <span className="input-group-notification" > "Discount will be equavalent to {Math.floor((this.state.price - this.state.dprice) / this.state.price * 100)}%" </span> : ""}
                <span className="input-group-alert" >{this.state.dpriceAlert} </span>

                <div className="input-group">
                    <div className="input-group-title">Expiration Duration*</div>
                    <div className="input-group-area">
                        <div className="input-group-date"><input type="number" value={this.state.days} onChange={this.handleChangedDate} placeholder="Number of days that discount is valid" ref={"5"} /></div>
                        <div className="input-group-date"><input value={this.state.expiry} onChange={this.handleChangedExpiry} tabIndex={"-1"} /></div>
                    </div>
                </div>
                <span className="input-group-alert" >{this.state.daysAlert} </span>
                <span className="input-group-notification" >{this.state.deadline}  </span>

                <div className="input-group">
                    <div className="input-group-title">{!this.state.saved ? "Coupon Image" : "Select Image"}</div>
                    <div className="input-group-area">
                        {!this.state.saved ?
                            <div><img width="100px" src={this.state.imageurl} key={this.state.imageurl.toString()} alt={this.state.imageurl} /></div>
                            :
                            <div   >
                                {this.props.images.map(function (item, index) {
                                    return (
                                        <img tabIndex={"0"} ref={"6"} className={(item === this.state.imageurl) ? "serviceImageSelected" : "serviceImage"} onClick={() => { this.handleClickImage(item) }} src={item} key={item} alt={item} />
                                    )
                                }, this)
                                }
                            </div>}
                    </div>
                </div>


                <div className="input-group">
                    {!this.state.saved ?
                        <div>
                            <button type="button" className="updateservice" onClick={() => { this.props.onUpdateClick(this.state); }} ref={"7"}> Update </button>
                            <button type="button" className="delservice" onClick={() => { this.props.onDeleteClick(this.props.service); }} > Delete </button>
                        </div>
                        :
                        <div>
                            <button type="button" className="saveservice" onClick={() => { this.handleAddClick() }} ref={"7"}> Save This Service Or Product</button>
                        </div>

                    }
                </div>
            </form>
        );
    }


    handleChangeDescription(event) {
        this.setState({ description: event.target.value, changed: true }, () => this.serviceValidation());
    }

    handleChangePrice(event) {
        this.setState({ price: event.target.value, changed: true }, () => {
            this.serviceValidation();
            if (this.state.dprice) {
                let discount = Math.floor((this.state.price - this.state.dprice) / this.state.price * 100);
                this.setState({ discount: discount });
            }
        });
    }

    handleChangedPrice(event) {
        this.setState({ dprice: event.target.value, changed: true }, () => {
            this.serviceValidation();
            if (this.state.price) {
                let discount = Math.floor((this.state.price - this.state.dprice) / this.state.price * 100);
                this.setState({ discount: discount });
            }
        });


    }

    handleChangeSubCategory(event) {
        this.setState({ subcategory: event.target.value, changed: true }, () => this.serviceValidation());
    }

    handleChangedDate(event) {
        let days = event.target.value;
        var today = new Date();
        var value = today.valueOf();
        value += 86400000 * days;
        let dateValue = new Date(value);
        let newDate = dateValue.toJSON().slice(0, 10);
        this.setState({ expiry: newDate, days: event.target.value, changed: true }, () => this.serviceValidation());

    }

    handleChangedExpiry(event) {
        this.setState({ expiry: this.state.expiry })
    }

    handleChangeImage() { }

    handleClickImage = (scr) => {
        this.setState({ imageurl: scr }, () => this.serviceValidation());

    }

    handleAddClick() {
        this.serviceValidation();
        if (this.state.validated === true) {
            if (this.props.onAddClick(this.state)) {
                //                this.setState({ addNewService: false });
                this.setState({ saved: false })
                this.setState({ saved: false })

            }
        }
        else {
            NotificationManager.error('Fill the required and select a relevant image form first');
        }

    }

    serviceValidation() {
        this.setState({ validated: true });

        if (this.state.subcategory === "") {
            this.setState({ subcategoryAlert: "Select Sub-Category", validated: false });
        }
        else {
            this.setState({ subcategoryAlert: null });
        }
        if (this.state.price === "") {
            this.setState({ priceAlert: "Set Original Price", validated: false });
        }
        else {
            this.setState({ priceAlert: null });
        } if (this.state.dprice === "") {
            this.setState({ dpriceAlert: "Set Discount Price", validated: false });
        }
        else {
            if (Math.floor((this.state.price - this.state.dprice) / this.state.price * 100) < 1)
                this.setState({ dpriceAlert: "Discounted price can not be more that price" })
            else this.setState({ dpriceAlert: null });
        }
        if (this.state.days === "") {
            this.setState({ daysAlert: "Set Days to Expiry of Discount", validated: false });
        }
        else {
            this.setState({ daysAlert: null });

        }
        if (this.state.description === "") {
            this.setState({ descriptionAlert: "Provide Description", validated: false });
        } else if (this.state.description.length < 25) {
            this.setState({ descriptionAlert: "Description is too short", validated: false });
        }
        else {
            this.setState({ descriptionAlert: null });

        }
        if (this.state.imageurl === "") {
            this.setState({ validated: false });
        }
    }

    _handleKeyPress(e, field) {
        if (e.keyCode === 13) {
            if (field === "1") this.refs[2].focus();
            else if (field === "2") this.refs[3].focus();
            else if (field === "3") this.refs[4].focus();
            else if (field === "4") this.refs[5].focus();
            else if (field === "5") this.refs[6].focus();
            else if (field === "6") this.refs[7].focus();
        }
    }


}
export default Newservice;


