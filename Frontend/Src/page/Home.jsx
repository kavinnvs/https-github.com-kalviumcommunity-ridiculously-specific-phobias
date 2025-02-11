import { useEffect, useState } from 'react'
import { Productcard } from '../Component/Productcard'

// const productdetails=[
//     {
//       image:"https://pixlr.com/images/generator/text-to-image.webp",
//       name:"Product1",
//       price:"$100",
//       description:"new product"
//     },
//     {
//       image:"https://pixlr.com/images/generator/text-to-image.webp",
//       name:"Product2",
//       price:"$100",
//       description:"new product"
//     },
//     {
//       image:"https://pixlr.com/images/generator/text-to-image.webp",
//       name:"Product3",
//       price:"$100",
//       description:"new product"
//     },
    
//   ]
export const Home = () => {

  const {products, setProducts} = useState([]);
  const {Error, setError} = useState(null);
  const { setLoading } = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/product/get-products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [Error, setError, setLoading, setProducts]);


  return (
    <div className='w-full min-h-screen bg-neutral-800'>
    <div className="grid grid-cols-5 gap-4 p-4">{
        products.map((product,index)=>{
            return(
                <>
                <Productcard key={index} {...product}/></>
            )
    })}</div></div>
  )
}