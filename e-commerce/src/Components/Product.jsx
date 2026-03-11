import { useEffect, useState } from "react";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import Card from "../ReusableComponents/Card";
import axios from "axios";

const Product = () => {
  const [productList, setProductList] = useState();

  // const productlist = [
  //   {
  //     name: "Shoes",
  //     img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-12-variant.webp",
  //     description: "Comfort Shoes",
  //     price: "1500",
  //   },
  //   {
  //     name: "Shirt",
  //     img: "https://uspoloassn.in/cdn/shop/files/6_dc53bce4-df69-4510-bcc0-b32d0fd761c0.jpg?v=1771481209",
  //     description: "US POLO Brand",
  //     price: "1750",
  //   },
  //   {
  //     name: "Chair",
  //     img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-2.webp",
  //     description: "Wooden Garden Chair",
  //     price: "1050",
  //   },
  //   {
  //     name: "Goggles",
  //     img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-3.webp",
  //     description: "Ray-bon",
  //     price: "850",
  //   },
  //   {
  //     name: "Watch",
  //     img: "https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw4bcefb11/images/Sonata/Catalog/77105SM12W_1.jpg?sw=600&sh=600",
  //     description: "Sonata",
  //     price: "1250",
  //   },
  // ];

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      console.log(data.products);

      setProductList(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {
            productList?.map((item) => (
              <div className="col-3">
                <Card
                  name={item.title}
                  img={item.images}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Product;
