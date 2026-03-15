import { useEffect, useState } from "react";
import Card from "../ReusableComponents/Card";
import axios from "axios";

const Product = () => {

  const [productList, setProductList] = useState([]);

  const fetchProduct = async () => {

    try {

      const { data } = await axios.get("http://localhost:3000/product/list");

      console.log(data.productList);

      setProductList(data.productList);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="text-center fw-bold mb-4">
        Our Products
      </h2>

      <div className="row g-4">

        {productList.map((item) => (

          <div
            className="col-lg-3 col-md-4 col-sm-6"
            key={item.id}
          >

            <Card
              name={item.productName}
              img={`http://localhost:3000/uploads/${item.productImage}`}
              description={item.productDescription}
              price={item.productPrice}
            />

          </div>

        ))}

      </div>

    </div>
  );
};

export default Product;