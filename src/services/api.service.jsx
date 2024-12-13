
import apiAdmin from "./interceptor"; // Adjust the path based on your file structure

// // Register User API
// export const UserRegisterService = (data) => {
//     return apiAdmin.post("/register", data);
// };

// Login User API
export const AdminLoginService = (data) => {
    return apiAdmin.post("/users/auth/login", data);
};


export const ProductServicePost = (data) => {
    return apiAdmin.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
        }
    });
};

export const ProductServiceGet = () => {
    return apiAdmin.post("/products");
};

