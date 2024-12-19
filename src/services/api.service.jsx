
import apiAdmin from "./interceptor"; // Adjust the path based on your file structure



// Login User API
export const AdminLoginService = (data) => {
    return apiAdmin.post("/users/auth/login", data);
};


// products => 

export const PostProductService = (data) => {
    return apiAdmin.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};

export const GetProductService = () => {
    return apiAdmin.get("/products");
};


export const FetchProductIdsService = () => {
    return apiAdmin.get("/products/ids");
};



// influencers ======> 



export const GetInfluencerService = () => {
    return apiAdmin.get("/influencers");
};

export const GetIndividualInfluencerService = (influencerId) => {
    return apiAdmin.get(`/influencers/${influencerId}`);
};


export const PostInfluencerService = (data) => {
    return apiAdmin.post("/influencers", data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};

// orders =====



export const GetOrdersService = () => {
    return apiAdmin.get("/orders");
};


export const MarkStatusDoneOrdersService = (orderId) => {
    return apiAdmin.put(`/orders/status/${orderId}`);
};


// review => 


export const GetReviewService = () => {
    return apiAdmin.get("/reviews/pending");
};



export const PublishReviewService = (reviewId) => {
    return apiAdmin.patch(`/reviews/${reviewId}`);
};

// help => 



export const GetHelpService = () => {
    return apiAdmin.get("/help");
};


export const MarkStatusDoneHelpService = (helpId) => {
    return apiAdmin.put(`/help/status/${helpId}`);
};


//styles 

export const PostStyleService = (data) => {
    return apiAdmin.post("/styles", data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};

export const GetStyleService = () => {
    return apiAdmin.get("/styles");
};


export const DeleteStyleService = (styleId) => {
    return apiAdmin.delete(`/style/${styleId}`);
};


export const EditStyleService = (data, styleId) => {
    return apiAdmin.post(`/style/${styleId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};


// testimonial 

export const GetTestimonialService = () => {
    return apiAdmin.get("/testimonials");
};

export const PostTestimonialService = (data) => {
    return apiAdmin.post("/testimonials", data);
};

export const DeleteTestimonialService = () => {
    return apiAdmin.delete("/testimonials");
};


// blogs => 


export const PostBlogsService = (data) => {
    return apiAdmin.post("/blogs", data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};


export const GetBlogsService = () => {
    return apiAdmin.get("/blogs");
};

// combinations 

export const PostCombinationService = (data) => {
    return apiAdmin.post("/combinations", data);
};


export const getIndividualCombinationService = (baseProductId) => {
    return apiAdmin.post(`/combinations/${baseProductId}`);
};



// dashboard 

export const GetDashboardCountService = () => {
    return apiAdmin.get("/dashboard/count");
};















