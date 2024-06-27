import axios from 'axios';
const protocol = window.location.protocol;
const API_URL = protocol === "http:"?'https://fakestoreapi.com/':"https://fakestoreapi.com/";
async function fetchData(url,signal){
    try{
        const response = await axios.get(url,{signal});
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
async function PostData(url,data){
    try{
        const response = await axios.post(url,data);
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
async function PostDatawithsignal(url,data,signal){
    try{
        const response = await axios.post(url,data,{signal});
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
async function patchData(url,data,signal){
    try{
        const response = await axios.patch(url,data,{signal});
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
async function putData(url,data,signal){
    try{
        const response = await axios.put(url,data,{signal});
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
async function deletData(url,signal){
    try{
        const response = await axios.delete(url,{signal});
        return {status:true, response:response};
    }catch(error){
        return {status:false, response:error.response};
    }
}
export function get_product(signal){
    const apiUrl =`${API_URL}products`;
    return fetchData(apiUrl,signal);
}
export function get_product_detail(id,signal){
    const apiUrl =`${API_URL}products/${id}`;
    return fetchData(apiUrl,signal)
}
export function get_all_categories(signal){
    const apiUrl =`${API_URL}products/categories`;
    return fetchData(apiUrl,signal)
}
export function get_product_by_categories_sort(category,sort,signal){
    const apiUrl =`${API_URL}products/category/${category}?sort=${sort}`;
    return fetchData(apiUrl,signal);
}
export function get_product_sort(sort,signal){
    const apiUrl =`${API_URL}products?sort=${sort}`;
    return fetchData(apiUrl,signal);
}
export function get_user_cart(id,signal){
    const apiUrl =`${API_URL}carts/user/${id}`;
    return fetchData(apiUrl,signal);
}
export function get_users(signal){
    const apiUrl =`${API_URL}users`;
    return fetchData(apiUrl,signal);
}

export function post_user(data){
    const apiUrl =`${API_URL}users`;
    return PostData(apiUrl,data);
}
export function login_user(data){
    const apiUrl =`${API_URL}auth/login`;
    return PostData(apiUrl,data);
}
// api for get user detail using token
// export function user_detail_token(token,signal){
//     const apiUrl =`${API_URL}user`;
//     return fetchData(apiUrl,token,signal);
// }
export function add_to_cart(data,signal){
    const apiUrl =`${API_URL}carts`;
    return PostDatawithsignal(apiUrl,data,signal);
}
export function update_cart(data,id,signal){
    const apiUrl =`${API_URL}carts/${id}`;
    return patchData(apiUrl,data,signal);
}
export function delete_cart(id,signal){
    const apiUrl =`${API_URL}carts/${id}`;
    return deletData(apiUrl,signal);
}
export function delete_cart_item(id,data,signal){
    const apiUrl =`${API_URL}carts/${id}`;
    return putData(apiUrl,data,signal);
}