import { createContext, useContext, useEffect, useState } from "react";
import { add_to_cart, get_cart, login_user, update_cart } from "./ApiService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, settoken] = useState(null);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    const intialSetup = async () => {
      try {
        const storeduser = await localStorage.getItem("user");
        const storedtoken = await localStorage.getItem("token");
        if (storeduser) setUser(JSON.parse(storeduser));
        if (storedtoken) settoken(storedtoken);
      } catch (error) {
        console.error("Initial Setup error", error);
      } finally {
        setLoading(false);
      }
    };
    intialSetup();
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  const login = (data) => {
    return login_user(data).then((res) => {
      if (res.status) {
        settoken(res.response.data.token);
        console.log(res);
        toast.success("login successfully");
        //suppose you have api for get user detail using token
        //use this for user name ,email and id for update cart
        //  user_detail_token(token).then(res=>{
        //     if(res.status){
        //         setUser(res.response.data)
        //     }
        //  })

        //suppose this detail save after user detail get through token
        setUser({
          address: {
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
            city: "kilcoole",
            street: "new road",
            number: 7682,
            zipcode: "12926-3874",
          },
          id: 1,
          email: "john@gmail.com",
          username: "johnd",
          password: "m38rmF$",
          name: {
            firstname: "john",
            lastname: "doe",
          },
          phone: "1-570-236-7033",
          __v: 0,
        });
        return true;
      } else {
        toast.success("invalid Crediential");
        return false;
      }
    });
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    settoken(null);
    toast.info("logout successfully");
  };
  const addtocart=(id,data,signal)=>{
    if(id){
        update_cart(data,id,signal).then(res=>{
            if(res.status){
                toast.success("Product add to cart successfully")
            }else{
                toast.info("something went wrong!")
            }
        })
    }else{
        add_to_cart(data,signal).then(res=>{
            if(res.status){
                toast.success("Product add to cart successfully")
            }else{
                toast.info("something went wrong!")
            }
        })
    }
  
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout,isloading,addtocart }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
