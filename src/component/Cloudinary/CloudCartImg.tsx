import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface EditProps {
    ImgUrl: string;
}

const CloudCartImg: React.FC<EditProps> = ({ ImgUrl }) => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dbsou9jps' } });

    console.log("ImgUrl:", ImgUrl);

    const img = cld.image(ImgUrl) // Removed curly braces around product.ImageURL
        .resize(auto().gravity(autoGravity()).width(160).height(100))
        .format('auto')
        .quality('auto');

    return <AdvancedImage  cldImg={img} />;
};

export default CloudCartImg;
