
export const findCategory=(categories,id)=>{
    const findcat= categories.find(ele=>ele._id==id)
    console.log('find',findcat)
    return findcat
}