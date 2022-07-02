import Image from 'next/image'
import Link from 'next/link'

import { useSelector } from 'react-redux';

export default function Navbar() {

  const cart = useSelector((state) => state.cart);

  const getTotalItems = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  };

  return (
  	<>

			<header className="p-2 w-full bg-white sticky top-0 drop-shadow shadow-gray-500">
				<div className="container flex justify-between h-16 mx-auto">
					<ul className="items-stretch hidden space-x-3 lg:flex">
						<li className="flex">
							<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 ">Shop</a>
						</li>
						<li className="flex">
							<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 ">Learn</a>
						</li>
					</ul>
					<Link href="/">
						<a rel="noopener noreferrer" aria-label="Homepage" className="flex text-xl items-center p-2 tracking-[.75em]">
							LUMIN
						</a>
					</Link>
					<div className="flex items-center md:space-x-4">

						<Link href="/cart">
						<button type="button" className=" px-6 py-2 font-semibold rounded ">
							<span>Cart</span>  {getTotalItems()}
						</button>
						</Link>
					</div>

				</div>
			</header>

  	</>
  );
}

