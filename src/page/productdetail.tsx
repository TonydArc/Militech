import React from 'react'
import Detail from '../component/Product/detail'
import Product from '../component/product'
import { useParams } from 'react-router-dom';

export default function Productdetail() {
    const { id } = useParams();

    const pdid = id
    return (
        <>  
            {/* <h1>{id}</h1> */}
            <div className="font-[sans-serif] bg-white">
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                    {/* img and name price */}
                    <Product id={pdid}/>

                    {/* detail */}
                    <Detail id={pdid}/>
                </div>
            </div>
        </>
    )
}
