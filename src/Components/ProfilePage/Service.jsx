import React, { Component } from 'react';
import '../../profile.css';
import Newservice from "./Newservice";
import API from '../../Service/API';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../notifications.css';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            imagesurl: [],
            services: [],
            validated: false,
            addNewService: false,
            validatedAlert: false,
            imageAlert: null,
            toUpdateAlert: null,
            removeService: false
        };

        this.handleAddSerive = this.handleAddSerive.bind(this);
        this.handleRemoveSerive = this.handleRemoveSerive.bind(this);
        this.handleUpdateSerive = this.handleUpdateSerive.bind(this);
        this.handleSaveSerive = this.handleSaveSerive.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.API = new API();
        this.initialState = this.state;
        this.formData = new FormData();
    }

    _handleKeyPress(e, field) {
        if (e.keyCode === 13) {
            if (field === "14") this.handleAddFeature();
            else if (field === "15") this.handleAddCondition();
            else if (field === "16") this.handleAddMaster();
            else {
                e.preventDefault(); // Prevent form submission if button present
                this.refs[Number(field) + 1].focus()
            }
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('jwt');
        if (!token) {
            this.props.history.replace('/')
        }
        else {
            let profile = this.API.getProfile();
            if (profile.type === "0") {
                this.props.history.replace('/User')
            }
            else {
                this.API.getCompanyServices(profile.id).then(res => {
                    if (res.data.message === "Cannot catch items.") {
                        console.log('No Item :', res.data.message);
                    }
                    else
                        this.setState({ services: res.data.items });
                }).then(z => {
                    this.API.getCompanyInfo(profile.id).then(res2 => {
                        if (res2.message === "Company is not registed") {
                            NotificationManager.error('Something goes wrong', "Login again");
                        }
                        else {
                            this.setState({ imagesurl: res2.data.imagesurl, company: res2.data.company, id: res2.data.id, category: res2.data.category });
                        }
                    }
                    )

                })
            }

        }

        for (let x in this.refs) {
            this.refs[x].onkeypress = (e) =>
                this._handleKeyPress(e, x);
        }
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <a className="active" href="/">PONPON</a>
                    <a href="/Profile">Acount and Profile </a>
                    <a href="/Service">Services and Discounts</a>
                    <a href="/Report">Reports and Messages</a>
                    <a className="topright" onClick={this.handleSignout} href="#Update">Sign Out <i className="fas fa-sign-in-alt"></i></a>
                </div>

                <div className="content">
                    <div className="pcard" id="Services">
                        <div className="card-header">
                            SERVICES AND DISCOUNTS
                        </div>
                        <div className="container">
                            <div >
                                {
                                    this.state.services.map(function (item, index) {
                                        return <Newservice key={item.itemid} index={index} service={item} images={this.state.imagesurl} onDeleteClick={this.handleRemoveSerive} onUpdateClick={this.handleUpdateSerive} onAddClick={this.handleSaveSerive} />
                                    }, this)
                                }
                            </div>
                            {!this.state.addNewService ?
                                <div className="DiscountCard">
                                    <button type="button" className="button" onClick={this.handleAddSerive}>Click to Add New Service Or Product</button>
                                </div>
                                : null}
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </div>
        );
    }



    handleSignout() {
        localStorage.removeItem('jwt');
        this.props.history.replace('/')

    }

    handleAddSerive() {
        if (this.state.imagesurl.length === 0)
            NotificationManager.error('You should have at least one image for your profile before add service');
        else if (this.state.addNewService === false) {
            let newService = {
                category: "",
                subcategory: "",
                description: "",
                price: "",
                dprice: "",
                deadline: "",
                imageurl: "",
                expiry: "",
                days: "",
                itemid: "tmp",
                saved: true
            }
            this.state.services.push(newService);
            this.setState(this.state);
            this.setState({ addNewService: true });
        }

    }

    handleRemoveSerive(index) {
        console.log('handleRemoveSerive', index);
        if (this.state.removeService === false) {
            NotificationManager.error('Click again to delete the item', null, 2000);
            this.setState({ removeService: true });
        }
        else {
            this.API.removeCompanyService(index.itemid)
                .then(res => {
                    if (res.message === "Service or product was removed") {
                        let filteredArray = this.state.services.filter(item => item.itemid !== index.itemid, this);
                        this.setState({ services: filteredArray }, () => {
                            console.log('callback', this.state.services);
                        })
                        this.setState({ services: filteredArray });
                        this.setState({ removeService: false });
                        NotificationManager.info('Item is removed', null, 2000);

                    }
                    else {
                        NotificationManager.error('Unable to delete the item, try later', null, 1000);
                    }

                })
        }

    }

    handleUpdateSerive(index) {
        if (index.changed) {
            this.API.updateCompanyService(index)
                .then(res => {
                    if (res.message === "Service was updated")
                        NotificationManager.info('Item is Updated');
                    else
                        NotificationManager.error('Unable to Update the item');
                })
        }
        else {
            NotificationManager.info('No changes to update');
        }
    }

    handleSaveSerive(service) {
        if (parseInt(service.dprice) >= parseInt(service.price)) {
            NotificationManager.error('Discounted Price should be less that Price');
            return false;
        }
        else {
            let fullService = service;
            fullService.company = this.state.company;
            fullService.companyid = this.state.id;
            fullService.category = this.state.category;
            this.API.addCompanyService(fullService).then(
                res => {
                    this.setState({ addNewService: false });
                    this.setState({ savedProfile: true });
                    NotificationManager.info('The service is saved. ');
                }
            )
            this.setState(this.state);
            return true;
        }
    }



}

export default Service;