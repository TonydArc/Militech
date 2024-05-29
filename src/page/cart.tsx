import React, { useEffect, useState } from 'react';
import CloudCartImg from '../component/Cloudinary/CloudCartImg';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    ProductId: number;
    ProductName: string;
    ImageURL: string;
    Price: number;
    Quantity: number;
}

export default function Cart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [subtotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const cookieName = 'access_token';

    const handleDelete = (ProductId: number) => {
        const updatedItems = items.filter(item => item.ProductId !== ProductId);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems)); // Update localStorage if needed
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('items');
        if (storedValue) {
            setItems(JSON.parse(storedValue));
        }
    }, []);

    useEffect(() => {
        const checkCookie = () => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
            if (cookie) {
                setAuth(true);
            }
        };
        checkCookie();
    }, []);

    const handleCheckOut = () => {
        if(auth) {
            navigate('/checkout');
        } else {
            navigate('/login')
        }
    };

    useEffect(() => {
        const calculatedSubtotal = items.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
        setSubTotal(calculatedSubtotal);
        setTotal(calculatedSubtotal + 5); // Assuming shipping is a flat $5
    }, [items]);

    if (!items.length) {
        return (
            <>
                <div className='mb-16'>
                    <p className="text-center mt-8 text-2xl">No items in the cart</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {items.map((item: CartItem) => (
                            <div key={item.ProductId} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <CloudCartImg ImgUrl={item.ImageURL}/>
                                {/* <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item.ProductName}</h2>
                                        {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.Quantity} min="1" readOnly />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">${item.Price}</p>
                                            {/* delete */}
                                            <svg onClick={() => { handleDelete(item.ProductId) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${subtotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$5</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${total}</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        {/* check out btn */}
                        <button onClick={() => {handleCheckOut()}} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>
        </>
    );
}
