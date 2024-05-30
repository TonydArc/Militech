import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/adminService';
import { getProfile } from '../services/authService';

interface CartItem {
    CustomerId: number;
    OrderDate: any;
    StatusId: number;
    ProductId: number;
    TotalAmount: number;
    Quantity: number;
    Price: number;
    MethodId: number;
    Address: string;
}

interface Profile {
    id: number;
}

export default function Checkout() {
    const [auth, setAuth] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [total, setTotal] = useState(Number);
    const [items, setItems] = useState<CartItem[]>([]);
    const [profile, setProfile] = useState<Profile>();
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const cookieName = 'access_token';

    useEffect(() => {
        const checkAuth = async () => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
            setAuth(!!cookie);
            setCheckingAuth(false);
        };
        checkAuth();
    }, []);

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
            } catch (err) {
                alert(err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const calculatedSubtotal = items.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
        setTotal(calculatedSubtotal + 5); // Assuming shipping is a flat $5
    }, [items]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleCheckOut = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile) {
            alert('Profile not loaded');
            return;
        }

        const CustomerId = profile.id;
        const StatusId = 1;
        const MethodId = 1;
        const ProductId = items[0]?.ProductId;
        const TotalAmount = total;
        const Quantity = items[0]?.Quantity;
        const Price = items[0]?.Price;
        const Address = address;

        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = today.getFullYear();
        const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;

        const orderData = {
            CustomerId,
            OrderDate: formattedDate,
            StatusId,
            ProductId,
            TotalAmount,
            Quantity,
            Price,
            MethodId,
            Address
        };

        try {
            await createOrder(orderData);
            alert('Order placed successfully');
            navigate('/');
        } catch (error) {
            alert('Order failed');
        }
    };

    if (checkingAuth) {
        return <p>Loading...</p>; // Or a loading spinner
    }

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="font-[sans-serif] bg-white-50 p-6 min-h-screen mt-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-[#333] text-center">Checkout</h2>
                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-[#333]">Choose your payment method</h3>
                        <div className="grid gap-4 sm:grid-cols-2 mt-6">
                            <div className="flex items-center">
                                <input type="radio" name="pay" className="w-5 h-5 cursor-pointer" id="card" />
                                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                    <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                    <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                    <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="pay" className="w-5 h-5 cursor-pointer" id="paypal" />
                                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                    <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                </label>
                            </div>
                        </div>
                        <form className="mt-8" onSubmit={handleCheckOut}>
                            <div className="grid gap-6">
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <input type="number" placeholder="Card number" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="EXP." className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="CVV" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                </div>
                                <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Name of card holder" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="Postal code" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="text" placeholder="Address" onChange={handleAddressChange} value={address} required className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button type="button" className="px-6 py-3.5 text-sm bg-transparent border text-[#333] rounded-md hover:bg-gray-100">Pay later</button>
                                <button type="submit" className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:border-l lg:pl-8">
                        <h3 className="text-xl font-bold text-[#333]">Summary</h3>
                        <ul className="text-[#333] mt-6 space-y-4">
                            <li className="flex flex-wrap gap-4 text-base font-bold border-t pt-4">Total <span className="ml-auto">{total}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
