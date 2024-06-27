import React, { useEffect, useState } from "react";
import Card from "./Card";
import { get_product } from "../../services/ApiService";
import Loading from "../../GlobalComponents/Loading/Loading";
import "./Home.css";
import Title from "../../GlobalComponents/Headings/Title";
import Categories from "../Product/Categories";
import Navbar from "../../GlobalComponents/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Auth_context";
function Home() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
if(!token){
navigate("/login")
}
  },[token])
  const [products, setProducts] = useState();
  const [loding, setLoading] = useState(true);
  const [contLoading, setContLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    get_product(signal).then((res) => {
      if (res.status) {
        setProducts(res.response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => controller.abort();
  }, []);

  return (
    <>
      {loding ? (
        <Loading />
      ) : (
        <>
        <Navbar/>
       
        <div className="home-prod-conatiner">
          <Title title={"Our Products"} />
          <Categories setProducts={setProducts} setLoading={setContLoading} />
          <div className="prod-sec">
            {contLoading ? (
              <Loading />
            ) : (
              <>
                {products &&
                  products.map((res, index) => <Card data={res} key={index} />)}
              </>
            )}
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default Home;
