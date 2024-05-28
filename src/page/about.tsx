import React from 'react'

export default function About() {
  return (
    <>
        <>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4 text-black">About Us</h1>
                        <p className="font-normal text-base leading-6 text-black">
                            Cửa hàng đồng hồ cơ No Apple Watch Zone là một địa điểm độc đáo và hài hước cho những người yêu thích phong cách truyền thống và không muốn bị lạc loài trong làng công nghệ hiện đại. Nằm ẩn mình trong một góc nhỏ của thành phố, cửa hàng này tự hào là nơi duy nhất không bán bất kỳ loại đồng hồ kỹ thuật số nào, đặc biệt là Apple Watch.</p>
                    </div>
                    <div className="w-full lg:w-8/12">
                        {/* <img className="w-full h-full"
                         src="https://images3.alphacoders.com/133/1338125.png" alt="A group of People" /> */}
                        <video className="h-96 w-full rounded-lg" controls autoPlay>
                            <source src="src/assets/pineapple.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4 text-black">Our Story</h1>
                        <p className="font-normal text-base leading-6 text-black">TrisNguyen, một người yêu truyền thống, ghét Apple Watch vì nó khiến anh ta mất kiểm soát. Một lần, khi anh ta đang nói chuyện nghiêm túc với sếp, Apple Watch bất ngờ báo động lượng pin sắp hết. TrisNguyen cảm thấy như bị phá bĩnh trước mặt sếp. Từ đó, anh quyết định tạm biệt với Apple Watch và trở lại với chiếc đồng hồ cơ đáng tin cậy của mình.</p>
                    </div>
                    <div className="w-full lg:w-8/12 lg:pt-8">
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="h-28 w-24 md:block hidden" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFGJqCTNbOSYQAhN6WbfQxwa0Hnufd3TA7cflq2LuYA&s" alt="Alexa featured Image" />
                                <img className="h-28 w-24 md:hidden block" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFGJqCTNbOSYQAhN6WbfQxwa0Hnufd3TA7cflq2LuYA&s" alt="Alexa featured Image" />
                                <p className="font-medium text-xl leading-5 mt-4 text-black" >TrisNguyen</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="h-28 w-24 md:block hidden" src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/08/Blackbeard-One-Piece.jpg" alt="Olivia featured Image" />
                                <img className="h-28 w-24 md:hidden block" src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/08/Blackbeard-One-Piece.jpg" alt="Olivia featured Image" />
                                <p className="font-medium text-xl leading-5 mt-4 text-black">long den</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="h-28 w-24 md:block hidden" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT-DCvY5AOsz_HybBokVEustfc9QwgQ_LIprmP_vf6bA&s" alt="Liam featued Image" />
                                <img className="h-28 w-24 md:hidden block" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT-DCvY5AOsz_HybBokVEustfc9QwgQ_LIprmP_vf6bA&s" alt="Liam featued Image" />
                                <p className="font-medium text-xl leading-5 mt-4 text-black">Pengu</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="h-28 w-24 md:block hidden" src="https://qph.cf2.quoracdn.net/main-qimg-722ecfc93dbf9003c2c9833ee84563f2-lq" alt="Elijah featured image" />
                                <img className="h-28 w-24 md:hidden block" src="https://qph.cf2.quoracdn.net/main-qimg-722ecfc93dbf9003c2c9833ee84563f2-lq" alt="Elijah featured image" />
                                <p className="font-medium text-xl leading-5 mt-4 text-black">Anh ba</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    </>
  )
}
