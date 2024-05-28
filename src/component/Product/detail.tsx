import React, { useEffect, useState } from 'react'
import { getProductsDetail } from '../../services/adminService';


interface ProductDetails {
    Brand: string;
    Model: string;
    Processor: string;
    GraphicsCard: string;
    RAMSize: string;
    StorageSize: string;
    ReleaseDate: string;
}

interface ProductProps {
    id: number;
}

export default function Detail({ id }: ProductProps) {
    const [productDetail, setProductDetail] = useState<ProductDetails | null>(null);

    const handleShowDetail = async (productId: number) => {
        try {
            const productDetailData = await getProductsDetail(productId);
            setProductDetail(productDetailData.Details);
            console.log(productDetail);
            
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        handleShowDetail(id);
    }, [id]);

    return (
        <>
            <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                <h3 className="text-lg font-bold text-[#333] text-left">Product information</h3>
                <ul className="mt-6 space-y-6 text-[#333]">
                    <li className="text-sm text-left">Brand <span className="ml-4 float-right">{productDetail?.Brand}</span></li>
                    <li className="text-sm text-left">Model <span className="ml-4 float-right">{productDetail?.Model}</span></li>
                    <li className="text-sm text-left">Processor <span className="ml-4 float-right">{productDetail?.Processor}</span></li>
                    <li className="text-sm text-left">Ram <span className="ml-4 float-right">{productDetail?.RAMSize}</span></li>
                    <li className="text-sm text-left">Storage Size <span className="ml-4 float-right">{productDetail?.StorageSize}</span></li>
                    <li className="text-sm text-left">Graphics Card <span className="ml-4 float-right">{productDetail?.GraphicsCard}</span></li>
                </ul>
            </div>
        </>
    )
}
