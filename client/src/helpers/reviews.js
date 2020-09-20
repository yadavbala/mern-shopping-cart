import React from 'react'
import ReactStars from 'react-stars'
import {connect} from 'react-redux'
import { startGetReview } from '../actions/reviewAction'
import {findReview} from '../selectors/reviewSelector'
class Review extends React.Component{
    state={
        rating:0
    }

    componentDidMount(){
        if(this.props.reviews.length==0){
            this.props.dispatch(startGetReview())
        }
    }
    ratingChanged=(newRating)=>{
        this.setState({rating:newRating},()=>this.props.handleRev(newRating))
    }
    
    render(){
        return(
            <div>
                <label>Your Rating For This Product
                <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={24}
                value={this.props.rev?this.props.rev?.review:this.state.rating}
                half={false}
                color2={'#ffd700'} />
                </label>
                
            </div>
        )
    }
}

const mapStateToProps=(state,props)=>{
    const id=props.productId
    return{
        reviews:state.review,
        user:state.user,
        rev:findReview(state.review,id,state.user._id)
    }
}

export default connect(mapStateToProps)(Review)