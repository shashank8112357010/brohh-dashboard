import apiAdmin from './interceptor' // Adjust the path based on your file structure

// Login User API
export const AdminLoginService = (data) => {
  return apiAdmin.post('/users/auth/login', data)
}



// category => 


  export const GetCategoryService = () => {
    return apiAdmin.get('/category')
  }
  export const DeleteCategoryService = (categoryId) => {
    return apiAdmin.delete(`/category/${categoryId}`)
  }
  
  export const PostCategoryService = (data) => {
    return apiAdmin.post('/category', data)
  }
  
  export const GetSubcategoriesServiceByCategoryId = (id) => {
    console.log(id , "id");
    return apiAdmin.get(`/category/${id}/subcategory`)
  }
  
  
  // sub category => 
  
  
  export const GetSubCategoryService = () => {
    return apiAdmin.get('/category/subcategory')
  }
  
  export const PostSubCategoryService = (data) => {
    return apiAdmin.post('/category/subcategory', data)
  }
  
  export const DeleteSubCategoryService = (subCategoryId) => {
    return apiAdmin.delete(`/category/subcategory/${subCategoryId}`)
  }

  

// products =>

export const PostProductService = (data) => {
  return apiAdmin.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data' // This is optional as Axios will set it automatically
    }
  })
}

export const GetProductService = () => {
  return apiAdmin.get('/products')
}
export const UpdateProductService = () => {
  return apiAdmin.get('/products')
}

export const DeleteProductService = (id) => {
  return apiAdmin.delete(`/products/${id}`)
}


export const FetchProductIdsService = () => {
  return apiAdmin.get('/products/ids')
}

// influencers ======>

export const GetInfluencerService = () => {
  return apiAdmin.get('/influencers')
}

export const GetIndividualInfluencerService = (influencerId) => {
  return apiAdmin.get(`/influencers/${influencerId}`)
}

export const PostInfluencerService = (data) => {
  return apiAdmin.post('/influencers', data, {
    headers: {
      'Content-Type': 'multipart/form-data' // This is optional as Axios will set it automatically
    }
  })
}

export const DeleteInfluencerService = (influencerId) => {
  return apiAdmin.delete(`/influencers/${influencerId}`)
}

// orders =====

export const GetOrdersService = () => {
  return apiAdmin.get('/orders')
}

export const MarkStatusDoneOrdersService = (orderId) => {
  return apiAdmin.put(`/orders/status/${orderId}`)
}

// review =>

export const GetReviewService = () => {
  return apiAdmin.get('/reviews')
}

export const PublishReviewService = (reviewId) => {
  return apiAdmin.patch(`/reviews/${reviewId}`)
}

// help =>

export const GetHelpService = () => {
  return apiAdmin.get('/help')
}

export const MarkStatusDoneHelpService = (helpId) => {
  return apiAdmin.put(`/help/status/${helpId}`)
}
export const DeleteHelpService = (helpId) => {
  return apiAdmin.delete(`/help/${helpId}`)
}

//styles

export const PostStyleService = (data) => {
  return apiAdmin.post('/styles', data, {
    headers: {
      'Content-Type': 'multipart/form-data' // This is optional as Axios will set it automatically
    }
  })
}

export const GetStyleService = () => {
  return apiAdmin.get('/styles')
}

export const DeleteStyleService = (styleId) => {
  return apiAdmin.delete(`/styles/${styleId}`)
}

export const EditStyleService = (data, styleId) => {
  return apiAdmin.post(`/styles/${styleId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data' // This is optional as Axios will set it automatically
    }
  })
}

// testimonial

export const GetTestimonialService = () => {
  return apiAdmin.get('/testimonials')
}

export const PostTestimonialService = (data) => {
  return apiAdmin.post('/testimonials', data)
}

export const DeleteTestimonialService = (testimonialId) => {
  return apiAdmin.delete(`/testimonials/${testimonialId}`)
}

// blogs =>

export const PostBlogsService = (data) => {
  return apiAdmin.post('/blogs', data, {
    headers: {
      'Content-Type': 'multipart/form-data' // This is optional as Axios will set it automatically
    }
  })
}

export const GetBlogsService = () => {
  return apiAdmin.get('/blogs')
}

export const DeleteBlogsService = (blogId) => {
  return apiAdmin.delete(`/blogs/${blogId}`)
}


// combinations

export const PostCombinationService = (data) => {
  return apiAdmin.post('/combinations', data)
}

export const getIndividualCombinationService = (baseProductId) => {
  return apiAdmin.post(`/combinations/${baseProductId}`)
}

// dashboard

export const GetDashboardCountService = () => {
  return apiAdmin.get('/dashboard/count')
}
