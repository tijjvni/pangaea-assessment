import styles from "../styles/Home.module.css";
import Image from 'next/image'

import { useQuery, gql } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';

import React, { useState, useEffect } from 'react'

const QUERY = gql`
      query Products ($currency: Currency!) {
        products {
          image_url
          id
          title
          price(currency: $currency ) 
        }
      }
    `;


export default function Products() {

	let [currency, setCurrency ] = useState('NGN');

	useEffect(() => {
	  const data = window.localStorage.getItem('currency');
	  if ( data !== null ) setCurrency(JSON.parse(data));
	}, []);

	// let [currency, setCurrency ] = useState(window.localStorage.getItem('currency'));
	// if (window.localStorage.getItem('currency') !== null) {
	// 	setCurrency('NGN');
	// } else {
		// setCurrency(window.localStorage.getItem('currency'));
	// }


  const currencies = ['NGN','USD','GBP'];
  const currencyOptions = [];
  
  currencyOptions.push(<option value={currency} key={currency}>{currency}</option>)
  currencies.forEach((data) => {
    if ( currency != data ) currencyOptions.push(<option value={data} key={data}>{data}</option>)
  })

  const changeCurrency = (e) => {
  	setCurrency(e.target.value);
		// useEffect(() => {
		  window.localStorage.setItem('currency', JSON.stringify(e.target.value));
		// }, [e.target.value]); 	
		// alert(e.target.value);
  };


	const dispatch = useDispatch();

	let { data, loading, error } = useQuery(QUERY, {
		variables: {currency}
	});

  if (loading) {
    return <h4 className="p-5 text-center">Fetching products ...</h4>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const products = data.products.slice(0, 4);



  return (
  	<>
	   	<div className=" px-3 my-3">
	      <div className="relative">
	        <select onChange={changeCurrency} className="block appearance-none bg-gray-200 border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
		      {currencyOptions}
	        </select>
	      </div>
	    </div>

	    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 p-5">

	      {products.map((product, key) => (
		    <div key={key} className="group bg-white rounded-md p-10 pt-20" >
				<div className="w-full aspect-w-1 aspect-h-1 rounded-lg text-center overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
			    	<Image src={product.image_url} alt="Picture of product" width={120} height={120}
			      		className="w-full h-full my-20 object-center object-cover group-hover:opacity-75" />
			    </div>
				<p className="my-5 mt-10 text-center text-base text-gray-500">{currency}{product.price.toLocaleString()}</p>
				<p className="mb-2 text-xl text-gray-700">{product.title}</p>

				<button onClick={() => dispatch(addToCart(product))} className="w-full flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700">
				  Add to cart
				</button>
		    </div>
	      ))}

	    </div>
    </>
  );
}

