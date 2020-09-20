

export const findProduct=(products,id)=>{
    return products.find(product=>product._id==id)
}

export const findCategoriesInProducts=(products,categories)=>{
    const categoriesFilter= products.filter(ele=>{
        return categories.includes(ele.categoryId)
    })
    return categoriesFilter
}