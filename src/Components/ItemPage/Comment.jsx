import React, { Component } from 'react';
import Comments from '../../Data/Comments';

class Comment extends Component {

    render() {
        var filteredComments = Comments.items.filter(i => i.id === this.props.itemId);
        return (

            <div >
                <div className="reviews">

                    {filteredComments.map(function (item, index) {
                        return (
                            <div className="reviewscard">
                                <ul>
                                    <li><i className="fa fa-user"></i>{item.writer}</li>
                                    <li><i className="fa fa-calendar"></i>{item.date}</li>
                                    <li><i className="fa fa-clock"></i>{item.time}</li>
                                </ul>
                                <p>{item.comment}</p>
                            </div>)


                    })}

                    <div className="reviewscard">
                        <p><b>Write Your Review</b></p>
                        <form action="#">
                            <textarea name="" ></textarea>
                            <b>Rating: </b> <img src="rating.png" alt="" />
                            <button type="button" className="btn btn-default pull-right">
                                Submit
							</button>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}

export default Comment;