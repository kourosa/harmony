import React, { Component } from 'react';
import Data from '../../Data/Profile';
import API from '../../Service/API';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../profile.css';
import '../../notifications.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: "",
            email: "",
            type: "1",
            password: "",
            password2: "",
            company: "",
            schedule: "Ежедневно: c 10:00 до 22:00",
            category: "Beauty and Spas",
            description: "",
            address: "",
            phone: "",
            website: "",
            instagram: "",
            fb: "",
            vk: "",
            map: "",
            conditions: ["Перед тем, как записаться на услугу, нужно обязательно сообщить нашему партнеру о том, что Вы обратились по акции.",
                "Вы можете приобрести неограниченное количество сертификатов по данной акции как для себя, так и в подарок.",
                "Сертификат распечатывать необязательно, достаточно сообщить его номер. "
            ],
            features: [],
            masters: [],
            imagesurl: [],
            newCondition: "",
            newFeature: "",
            newMaster: "",
            newUser: false,
            validated: false,
            addNewService: false,
            selectedFile: null,
            validatedAlert: false,
            imageAlert: null,
            companyAlert: null,
            scheduleAlert: null,
            categoryAlert: null,
            descriptionAlert: null,
            addressAlert: null,
            phoneAlert: null,
            websiteAlert: null,
            instagramAlert: null,
            fbAlert: null,
            vkAlert: null,
            mapAlert: null,
            toUpdateAlert: null,
            savedProfile: true,
            removeService: false
        };

        this.handleSignout = this.handleSignout.bind(this);
        this.handleDeleteMaster = this.handleDeleteMaster.bind(this);
        this.handleDeleteCondition = this.handleDeleteCondition.bind(this);
        this.handleDeleteFeature = this.handleDeleteFeature.bind(this);
        this.handleMasterChange = this.handleMasterChange.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleFeatureChange = this.handleFeatureChange.bind(this);
        this.handleAddMaster = this.handleAddMaster.bind(this);
        this.handleAddCondition = this.handleAddCondition.bind(this);
        this.handleAddFeature = this.handleAddFeature.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangePass2 = this.handleChangePass2.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleUpdateCompany = this.handleUpdateCompany.bind(this);
        this.handleAddCompany = this.handleAddCompany.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeFacebook = this.handleChangeFacebook.bind(this);
        this.handleChangeInstagram = this.handleChangeInstagram.bind(this);
        this.handleChangeMap = this.handleChangeMap.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
        this.handleChangeVk = this.handleChangeVk.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.handleChangeImageIploadChange = this.handleChangeImageIploadChange.bind(this);
        this.handleSelectImageClicked = this.handleSelectImageClicked.bind(this);
        this.formValidation = this.formValidation.bind(this);

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
        //should validate
        if (!token) {
            this.props.history.replace('/')
        }
        else {
            let profile = this.API.getProfile();
            if (profile.type === "0") {
                this.props.history.replace('/User')
            }
            else {
                this.setState({ email: profile.email, username: profile.username, id: profile.id });
                this.API.getCompanyInfo(profile.id)
                    .then(res => {
                        if (res.message === "Company is not registed") {
                            this.setState({ newUser: true });
                        }
                        else {
                            this.setState(res.data, () => { this.formValidation() });
                        }
                    }
                        //???
                    )
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
                    <a href="#profile">Acount and Profile </a>
                    <a href="/Service" onClick={(e) => {
                        if (this.state.savedProfile === false) {
                            e.preventDefault();
                            NotificationManager.info('Save your changes before leave');
                        }
                    }}>Services and Discounts</a>
                    <a href="/Report">Reports and Messages</a>
                    <a className="topright" onClick={this.handleSignout} href="#Update">Sign Out <i className="fas fa-sign-in-alt"></i></a>
                </div>

                <div className="content">
                    <div className="pcard" id="profile">
                        <div className="card-header">
                            ACCOUNT AND PROFILE
                        </div>
                        <div className="container">
                            <h3>Account information : </h3>
                            <div className="input-group">
                                <div className="input-group-title">Username*</div>
                                <div className="input-group-area"><input type="text" value={this.state.username} onChange={this.handleChangeUser} ref={"1"} /> </div>
                            </div>

                            <div className="input-group">
                                <div className="input-group-title">Email*</div>
                                <div className="input-group-area"><input type="text" value={this.state.email} onChange={this.handleChangeEmail} ref={"2"} /> </div>
                            </div>

                            <h3>Bussiness Information : </h3>
                            <div className="input-group">
                                <div className="input-group-title">Company*</div>
                                <div className="input-group-area"><input type="text" value={this.state.company} onChange={this.handleChangeCompany} placeholder={Data.Company} ref={"3"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.companyAlert} </span>

                            <div className="input-group">
                                <div className="input-group-title" >Category*</div>
                                <div ><select id="soflow" value={this.state.category} onChange={this.handleChangeCategory} ref={"4"}>
                                    <option>Beauty and Spas</option>
                                    <option>Health and Fitness</option>
                                    <option>Fun and Leisure</option>
                                    <option>Gift and Flowers</option>
                                    <option>Food and Drink</option>
                                    <option>Other</option>
                                </select>
                                </div>
                            </div>
                            <span className="input-group-alert" >{this.state.categoryAlert}   </span>


                            <div className="input-group">
                                <div className="input-group-title">Description</div>
                                <div className="input-group-area"><input type="text" value={this.state.description} onChange={this.handleChangeDescription} placeholder={Data.Description} ref={"5"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.descriptionAlert}</span>


                            <div className="input-group">
                                <div className="input-group-title">Address*</div>
                                <div className="input-group-area"><input type="text" key={"add"} value={this.state.address} onChange={this.handleChangeAddress} placeholder={Data.Address} ref={"6"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.addressAlert}   </span>


                            <div className="input-group">
                                <div className="input-group-title">Schedule*</div>
                                <div className="input-group-area"><input type="text" key={"sch"} value={this.state.schedule} onChange={this.handleChangeSchedule} placeholder={Data.Schedule} ref={"7"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.scheduleAlert}   </span>


                            <div className="input-group">
                                <div className="input-group-title">Phone*</div>
                                <div className="input-group-area"><input type="text" key={"phone"} value={this.state.phone} onChange={this.handleChangePhone} placeholder={Data.Phone} ref={"8"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.phoneAlert}   </span>


                            <h3>Social Media :</h3>
                            <div className="input-group">
                                <div className="input-group-title">Website Link</div>
                                <div className="input-group-area"><input type="text" key={"web"} value={this.state.website} onChange={this.handleChangeWebsite} ref={"9"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.websiteAlert}   </span>

                            <div className="input-group">
                                <div className="input-group-title">Location on Map</div>
                                <div className="input-group-area"><input type="text" key={"map"} value={this.state.map} onChange={this.handleChangeMap} ref={"10"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.mapAlert}   </span>

                            <div className="input-group">
                                <div className="input-group-title">Instagram Link</div>
                                <div className="input-group-area"><input type="text" key={"insta"} value={this.state.instagram} onChange={this.handleChangeInstagram} ref={"11"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.instagramAlert}   </span>

                            <div className="input-group">
                                <div className="input-group-title">VK Link</div>
                                <div className="input-group-area"><input key={"vk"} type="text" value={this.state.vk} onChange={this.handleChangeVk} ref={"12"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.vkAlert}   </span>

                            <div className="input-group">
                                <div className="input-group-title">Facebook Link</div>
                                <div className="input-group-area"><input key={"Facebook"} type="text" value={this.state.fb} onChange={this.handleChangeFacebook} ref={"13"} /> </div>
                            </div>
                            <span className="input-group-alert" >{this.state.fbAlert}   </span>
                        </div>

                        <div className="container">


                            <h3>Descriptions and Features :</h3>
                            <div className="input-group">
                                <div className="input-group-title">New Item</div>
                                <div className="input-group-area"><input type="text" key="Features" value={this.state.newFeature} onChange={this.handleFeatureChange} placeholder="e.g. The Spa Procedure takes 60 minutes" ref={"14"} /> </div>
                                <button className="input-group-buttin" onClick={() => { this.handleAddFeature(); }}>Add</button>
                            </div>
                            <div key="f" className="rounded-list">
                                {this.state.features.map(function (item, index) {
                                    if (item !== "")
                                        return (<span key={this.generateKey(index)} > {item}
                                            <button className="deletebutton" key={item} onClick={() => { this.handleDeleteFeature(index) }}> delete </button>
                                        </span>);
                                }, this)}

                            </div>
                            <h3>Term and Conditions :</h3>
                            <div className="input-group">
                                <div className="input-group-title">New Item</div>
                                <div className="input-group-area"><input type="text" key="conditions" value={this.state.newCondition} onChange={this.handleConditionChange} placeholder="e.g. Before you get the service, be sure to inform our partner that you have applied." ref={"15"} /> </div>
                                <div className="input-group-buttin" onClick={this.handleAddCondition}>Add</div>
                            </div>
                            <div className="rounded-list">
                                {this.state.conditions.map(function (item, index) {
                                    if (item !== "")
                                        return (<span key={index} > {item}
                                            <button className="deletebutton" key={item} onClick={() => { this.handleDeleteCondition(index) }}> delete </button>
                                        </span>);
                                }, this)}

                            </div>
                            <h3>Staffs and Masters :</h3>
                            <div className="input-group">
                                <div className="input-group-title">New Item</div>
                                <div className="input-group-area"><input type="text" key="masters" value={this.state.newMaster} onChange={this.handleMasterChange} placeholder="e.g. Master - Regan, experience of 7 years." ref={"16"} /> </div>
                                <div className="input-group-buttin" onClick={this.handleAddMaster}>Add</div>
                            </div>
                            <div className="rounded-list">
                                {this.state.masters.map(function (item, index) {
                                    if (item !== "")
                                        return (<span key={index} > {item}
                                            <button className="deletebutton" key={item} onClick={() => { this.handleDeleteMaster(index) }}> delete </button>
                                        </span>);
                                    else return ""

                                }, this)}

                            </div>

                            <h3>Profile Images :</h3>
                            <div className="input-group">
                                <div className="input-group-title">Profile Images</div>
                                <div className="input-group-area"><input className="inputfile" onClick={this.handleSelectImageClicked} onChange={this.handleChangeImageIploadChange} type="file" name="pic" accept="image/*" placeholder="Click to Add Profile Image or Update It" /></div>
                                <button className="input-group-buttin" onClick={this.handleUploadImageClicked} ref={"upload"}>Upload</button>
                            </div>
                            <span className="input-group-alert" >{this.state.imageAlert} &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;  </span>
                            <div className="input-group">
                                <div className="input-group-area">
                                    {this.state.imagesurl.map((item, index) => {
                                        return (
                                            <span className="img-wrap" key={item.toString()}>
                                                <span className="delete">&times;</span>
                                                <img key={item.toString()} className="profileImage" src={item} alt={item} />
                                            </span>

                                        )

                                    }, this)
                                    }
                                </div>
                            </div>
                            <h3>Save and Update Profile :</h3>
                            {this.state.newUser ?
                                <button type="button" className="button" onClick={() => { this.handleAddCompany() }}>
                                    <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                                    Save and Create Your Profile so you can Add Services</button>
                                :
                                <button type="button" className="button" onClick={() => { this.handleUpdateCompany() }}>
                                    Save and Update Your Profile so you can Add Services</button>

                            }
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </div>
        );
    }

    handleMasterChange = event => {
        this.setState({ newMaster: event.target.value });
    };
    handleAddMaster = () => {
        if (this.state.newMaster !== "") {
            if (this.state.masters[0] === "") var newList = [this.state.newMaster];
            else var newList = [...this.state.masters, this.state.newMaster];
            this.setState({ masters: newList, newMaster: "", savedProfile: false });
        }
    };
    handleDeleteMaster = (index) => {
        let newArray = this.state.masters;
        newArray.splice(index, 1);
        this.setState({ masters: newArray, savedProfile: false })
    }

    handleConditionChange = event => {
        this.setState({ newCondition: event.target.value });
    };
    handleAddCondition = () => {
        if (this.state.newCondition !== "") {
            if (this.state.conditions[0] === "") var newList = [this.state.newCondition];
            else var newList = [...this.state.conditions, this.state.newCondition];
            this.setState({ conditions: newList, newCondition: "", savedProfile: false });
        }
    };
    handleDeleteCondition = (index) => {
        let newArray = this.state.conditions;
        newArray.splice(index, 1);
        this.setState({ conditions: newArray, savedProfile: false })
    }

    handleFeatureChange = event => {
        this.setState({ newFeature: event.target.value });
    };
    handleAddFeature = () => {
        if (this.state.newFeature !== "") {
            if (this.state.features[0] === "") var newList = [this.state.newFeature];
            else var newList = [...this.state.features, this.state.newFeature];
            this.setState({ features: newList, newFeature: "", savedProfile: false });
        }
    };
    handleDeleteFeature = (index) => {
        let newArray = this.state.features;
        newArray.splice(index, 1);
        this.setState({ features: newArray, savedProfile: false })
    }

    handleSignout() {
        localStorage.removeItem('jwt');
        this.props.history.replace('/')

    }

    handleChangeUser(event) {
        // this.setState({ username: event.target.value });
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value, savedProfile: false });
    }

    handleChangePass2(event) {
        this.setState({ password2: event.target.value, savedProfile: false });
    }

    handleChangeEmail(event) {
        // this.setState({ email: event.target.value });
    }


    handleChangeCompany(event) {
        this.setState({ company: event.target.value, savedProfile: false }, () => this.formValidation())

    }

    handleChangeDescription(event) {
        this.setState({ description: event.target.value, savedProfile: false }, () => this.formValidation())

    }

    handleChangeCategory(event) {
        this.setState({ category: event.target.value, savedProfile: false }, () => this.formValidation())

    }

    handleChangeAddress(event) {
        this.setState({ address: event.target.value, savedProfile: false }, () => this.formValidation())

    }

    handleChangeSchedule(event) {
        this.setState({ schedule: event.target.value, savedProfile: false }, () => this.formValidation());

    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value, savedProfile: false }, () => this.formValidation());

    }

    handleChangeWebsite(event) {
        this.setState({ website: event.target.value, savedProfile: false }, () => this.formValidation());
    }


    handleChangeInstagram(event) {
        this.setState({ instagram: event.target.value, savedProfile: false }, () => this.formValidation());
    }

    handleChangeFacebook(event) {
        this.setState({ fb: event.target.value, savedProfile: false }, () => this.formValidation());

    }

    handleChangeVk(event) {
        this.setState({ vk: event.target.value, savedProfile: false }, () => this.formValidation());
    }

    handleChangeMap(event) {
        this.setState({ map: event.target.value, savedProfile: false }, () => this.formValidation());
    }










    handleChangeImageIploadChange = (event) => {
        if ((event.target.files[0]))
            if (event.target.files[0] !== null)

                if (event.target.files[0].size < 150000) {
                    console.log('file info', event.target.files[0].size);
                    this.setState({ imageAlert: "Click on upload to save image" });
                    this.setState({ selectedFile: event.target.files[0] });
                    this.refs["upload"].focus();
                } else {
                    this.setState({ imageAlert: "file size is more than 150 kb" });
                }




    }

    handleUploadImageClicked = () => {
        //this.API.uploadImage2(this.formData, this.state.id).then(

        if (this.state.selectedFile === null) {
            NotificationManager.info('Select a file, before upload.', "No file selected");
        }
        else

            this.API.uploadImage(this.state.selectedFile, this.state.id).then(
                res => {
                    if (res.message === "File Uploaded.") {
                        NotificationManager.warning('Save your profile after upload images', "Save You Changes");
                        this.setState({ imageAlert: "", savedProfile: false });
                        let url = new URL(res.path, "http://localhost:8080/ReactAPI/API/").href;
                        if (this.state.imagesurl[0] === "")
                            this.setState(prevState => ({
                                imagesurl: [url]
                            }))
                        else
                            this.setState(prevState => ({
                                imagesurl: [...prevState.imagesurl, url]
                            }))
                        this.setState(this.state.imagesurl)

                    }
                    else
                        this.setState({ imageAlert: "Unable to Upload This Image" });
                }
            )
    }

    handleUpdateCompany = () => {

        this.formValidation()
        if (this.state.validated === false) {
            NotificationManager.error('You Should Fill the Required Fields')
            this.setState({ toUpdateAlert: "You need to fill all required fields, but some are not filled correctly." });
        }
        else if (this.state.savedProfile === true) {
            NotificationManager.info('There is no change to be saved!');
        }
        else {
            this.API.updateCompany(this.state).then(
                res => {
                    NotificationManager.info('Your profile is updated');
                    this.setState({ savedProfile: true });
                })
        }
    }

    handleAddCompany = () => {
        this.formValidation();
        if (this.state.validated === false) {
            NotificationManager.error('You Should Fill the Required Fields')
            this.setState({ toUpdateAlert: "You need to fill all required fields, but some are not filled correctly." });
        }
        else {
            this.API.addCompany(this.state).then(
                res => {
                    NotificationManager.info('You profile is created')
                    this.setState({ savedProfile: true });
                })
        }
    }

    formValidation() {
        this.setState({ validated: true, toUpdateAlert: null });

        if (this.state.company.length < 3) {
            this.setState({ companyAlert: "Please Provide Full Name of Company", validated: false });
        }
        else if (this.state.company.length < 12) {
            this.setState({ companyAlert: "The bussiness name is too short", validated: false });
        }
        else {
            this.setState({ companyAlert: null });
        }
        if (this.state.schedule === "") {
            this.setState({ scheduleAlert: "Provide Working Days and Hours", validated: false });

        } else {
            this.setState({ scheduleAlert: "" });
        }
        if (this.state.category === "") {
            this.setState({ categoryAlert: "Select the Category", validated: false });
        } else {
            this.setState({ categoryAlert: null });
        }
        if (this.state.description === "") {
            this.setState({ descriptionAlert: "Provide Description of Your Company", validated: false });
        }
        else if (this.state.description.length < 30) {
            this.setState({ descriptionAlert: "Description is too short, describe more", validated: false });
        }
        else {
            this.setState({ descriptionAlert: null });
        }
        if (this.state.address === "") {
            this.setState({ addressAlert: "Provide The Company Address", validated: false });
        } else {
            this.setState({ addressAlert: null });
        }
        if (this.state.phone.length < 7) {
            this.setState({ phoneAlert: "Provide valid phone number", validated: false });
        } else {
            this.setState({ phoneAlert: null });
        }
        var expression = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        var regex = new RegExp(expression);

        if (!regex.test(this.state.website) && this.state.website) {

            this.setState({ websiteAlert: "This is not a valid WebSite Address", validated: false });
        }
        else
            this.setState({ websiteAlert: null });


        if (!regex.test(this.state.vk) && this.state.vk)
            this.setState({ vkAlert: "This is not a valid link to VK", validated: false });
        else

            this.setState({ vkAlert: null });

        if (!regex.test(this.state.fb) && this.state.fb) {
            this.setState({ fbAlert: "This is not a valid link to Facebook", validated: false });

        }
        else
            this.setState({ fbAlert: null });

        if (!regex.test(this.state.instagram) && this.state.instagram) {
            this.setState({ instagramAlert: "This is not a valid link to Instagram", validated: false });
        }
        else
            this.setState({ instagramAlert: null });


        if (!regex.test(this.state.map) && this.state.map) {
            this.setState({ mapAlert: "This is not a valid link to Map", validated: false });
        }
        else
            this.setState({ mapAlert: "" });

    }

    handleSelectImageClicked() {
        NotificationManager.info('Not more than 150 kb', 'Select a Vertical Image', 5000);
    }

    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }

}

export default Profile;