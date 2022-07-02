import Image from 'next/image'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';

import React, { useState, useEffect } from 'react'

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

	let [currency, setCurrency ] = useState('N');

	useEffect(() => {
	  const data = window.localStorage.getItem('currency');
	  if ( data !== null ) setCurrency(JSON.parse(data));
	}, []);

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };


  return (
  	<>

		<div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        	<Link href="/">
				  <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity"></div>
			</Link>		  

		  <div className="fixed inset-0 overflow-hidden">
		    <div className="absolute inset-0 overflow-hidden">
		      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

		        <div className="pointer-events-auto relative w-screen max-w-md">
		        
			        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
			            <div className="text-center px-4 sm:px-6">
			              <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
			            </div>			            
			            <div className="text-center my-2 px-4 flex justify-between">
			            	<Link href="/">
				            	<span className="text-lg text-gray-700 border border-gray-200 rounded-full py-2 px-4 cursor-pointer">&gt;</span>
			            	</Link>
			            </div>
			            <div className="relative flex-1 px-4 sm:px-6">
			              <div className="absolute inset-0 px-4 sm:px-6">
			                <div className="h-full border-gray-200 divide-y divide-gray-200 py-3" aria-hidden="true">

												{cart.length === 0 ? (
													<h1 className="p-5 text-center">Your Cart is Empty!</h1>
												) : (
												<>
							        	{cart.map((item) => (

													<li key={item.id} className="flex flex-col py-2 sm:justify-between">
												        <div className="flex">
												          <a onClick={() => dispatch(removeFromCart(item))} className="flex-1 bg-gray-light text-right font-bold cursor-pointer"> x </a>
												        </div>  
														<div className="flex w-full gap-2">
															<div className="flex flex-col justify-between w-full">
																<div className="flex jw-full pb-2 space-x-2">
																	<div className="space-y-1">
																		<h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.title}</h3>
																		<p className="text-sm ">One time purchase of supply</p>
																	</div>
																</div>
																<a className="bottom-0 inset-x-0 bg-gray-light cursor-pointer">
																	<div className="inline rounded-md shadow-sm border border-gray-100 p-2" role="group">
																		<button onClick={() => dispatch(decrementQuantity(item))}  type="button" className="inline-flex items-center p-2 text-sm font-medium text-gray-900 bg-transparent rounded-l-md "> - </button>
																		<input type="number" min="1" value={item.quantity} className="inline-flex w-16 items-center p-2 text-sm font-medium text-gray-900 bg-transparent focus:outline-none "/>
																		<button onClick={() => dispatch(incrementQuantity(item))}  type="button" className="inline-flex items-center p-2 text-sm font-medium text-gray-900 bg-transparent rounded-r-md"> + </button>
																	</div>
																	<span className="text-sm float-right"> {currency}{item.price.toLocaleString()} </span>
																</a>
															</div>
													    	<Image alt="Picture of product" width={50} height={50}
										      					className="flex-shrink-0  w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32" src={item.image_url}/>				
														</div>
													</li>

								        ))}

		
								        <h2>Total: {currency}{getTotalPrice().toLocaleString()}</h2>

								        </>
							      )}
			                </div>
			              </div>
			            </div>
			        </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>


  	</>
  );
}

