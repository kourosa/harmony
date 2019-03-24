import React, { Component } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Menu from '../Menu/Menu';
import Data from '../../Data/Item';
import Comment from './Comment';
import API from '../../Service/API';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../notifications.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                conditions: [],
                features: [],
                masters: [],
                imagesurl: [],
            },
            items: []
        }
        this.handleBuyClick = this.handleBuyClick.bind(this);
    }
    componentWillMount() {
        this.API = new API();
        this.API.getCompanyInfo(this.props.match.params.item)
            .then(res => {
                this.setState({ data: res.data });
                this.API.getCompanyServices(this.props.match.params.item).then(ress => {
                    if (ress.data.message === "Cannot catch items.")
                        console.log('No Item :', ress.data.message);
                    else
                        this.setState({ items: ress.data.items });
                })
            });
    }

    render() {
        var ItemData = Data.items.find(i => i.id === this.props.match.params.item);
        ItemData = this.state.data;
        return (
            <div>
                <Menu />
                <div className="itemcontainer" >

                    <div className="col-12 col-s-12">
                        <div className="itemcard">

                            <h2> {ItemData.company} </h2>
                            <p><i className="fa fa-tags"> {ItemData.description}</i></p>
                            <div className="simplep"><p>  {ItemData.address}</p></div>
                        </div>
                    </div>
                    <div className="col-7 col-s-7">
                        <div className="itemcard">
                            <Carousel showIndicators={false}>
                                {ItemData.imagesurl.map(
                                    function (item) {
                                        return (
                                            <div key={item}><img src={item} alt={item} key={item} /></div>)
                                    }, this)}
                            </Carousel>
                        </div>
                    </div>


                    <div className="col-5-sticky">
                        <div className="discountcard">
                            <h3>Promotions</h3>
                            <p className="far fa-clock"> Limited Time Remaining!</p>
                            <div className="grouplist">
                                <ul>
                                    {this.state.items.map(
                                        function (item) {
                                            return (
                                                <li key={item}>
                                                    <p className="discountP">{item.description}</p>
                                                    <p> <span className="discount"> {Math.floor((item.price - item.dprice) / item.price * 100)}% </span><span className="price"> {item.price} </span><span className="dprice">{item.dprice}</span></p>
                                                    <button type="button" className="discountbutton" onClick={() => { this.handleBuyClick(item) }}>Buy</button>
                                                </li>
                                            )
                                        }, this)}

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-7 col-s-7">

                        {(ItemData.features[0] !== "") ? (
                            <div className="itemcard">
                                <h3 >Description and Features</h3>
                                <div className="rounded-list">
                                    {ItemData.features.map(i => <span key={i}>{i}</span>)}
                                </div>
                            </div>) : null}

                        {(ItemData.conditions[0] !== "") ? (
                            <div className="itemcard">
                                <h3 >Term and Conditions</h3>
                                <div className="rounded-list-conditions">
                                    {ItemData.conditions.map(i => <span key={i}>{i}</span>)}
                                </div>
                            </div>) : null}

                        {(ItemData.masters[0] !== "") ?
                            (
                                <div className="itemcard">
                                    <h2 >Staff and Masters</h2>
                                    <div className="rounded-list-staff">
                                        {ItemData.masters.map(i => <span key={i}>{i}</span>)}
                                    </div>
                                </div>) : null}


                        <div className="itemcard">
                            <h2 >More About {ItemData.company}</h2>
                            <div className="grouplist">
                                <ul>
                                    <li><i className="fa fa-address-card">  </i>Address : {ItemData.address}</li>
                                    <li><i className="fa fa-phone-square"></i> Phone :{ItemData.phone} </li>
                                    <li><i className="fa fa-clock">  </i> Working Hours:{ItemData.schedule}</li>
                                    {ItemData.map ? <li><i className="fa fa-map-marker-alt"><a href={ItemData.map}>Location : See on map</a></i> </li> : null}
                                    {ItemData.instagram ? <li> <i className="fab fa-instagram"><a href={ItemData.instagram}>{ItemData.company} Instagram Page</a></i></li> : null}
                                    {ItemData.vk ? <li> <i className="fab fa-vk"><a href={ItemData.vk}> {ItemData.company} VK Page</a></i></li> : null}
                                    {ItemData.fb ? <li> <i className="fab fa-facebook"><a href={ItemData.fb}> {ItemData.company} Facebook Page</a></i></li> : null}
                                    {ItemData.website ? <li> <i className="fa fa-code"><a href={ItemData.website}>{ItemData.company} Website</a></i></li> : null}
                                </ul>
                            </div>

                        </div>
                        <div className="itemcard">

                            <h3>Reviews</h3>
                            <Comment itemId={ItemData.id} />
                        </div>
                        <NotificationContainer />
                    </div>
                </div>

            </div>

        );

    }



    handleBuyClick = (item) => {
        console.log('item', item);
        let token = localStorage.getItem('jwt');

        //should validate
        if (!token) {
            NotificationManager.info('Login to your acount to buy!');
        }
        else {
            let profile = this.API.getProfile();
            console.log('profile', profile);
            if (true) {
                //  if (profile.type === "0") {
                //this.props.history.replace('/user')
                let profile = this.API.getProfile();
                let num = item.itemid.toString().length;
                let itemCode = '0'.repeat(5 - num) + item.itemid.toString();
                let num2 = profile.id.toString().length;
                let userCode = '0'.repeat(5 - num2) + profile.id.toString();
                let coupon = Date.now() + itemCode + userCode;
                let a = 'Check you account for detail! couponNumber: ' + coupon;
                console.log('coupon', coupon);
                let couponData = {};
                couponData.companyid = this.state.data.id;
                couponData.itemid = item.itemid;
                couponData.userid = profile.id;
                this.API.addCoupon(couponData)
                    .then(res => {
                        if (res.message === "coupon saved") {
                            NotificationManager.info(a);
                        }
                        else
                            console.log("add item api responce:", res);
                    })
                    ;

            }
            else {
                NotificationManager.info('Sign in with a client account');
            }
        }
    }



}

export default Item;