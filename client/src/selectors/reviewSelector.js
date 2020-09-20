
export const findReview=(reviews,id,user)=>{
    const usersreview=reviews.filter(ele=>ele.user==user)
    const finalReview=usersreview.find(ele=>ele.product==id)
    return finalReview
}