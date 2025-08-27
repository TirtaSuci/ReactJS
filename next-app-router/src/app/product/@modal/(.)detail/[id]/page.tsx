// import Modal from "@/app/components/core/Modal/page";
// import { getProductById } from "@/app/services/products/products";
// import Image from "next/image";

// type ProductPageProps = {
//     params: { id: string };
// };

// export default async function DetailProductPage({ params }: ProductPageProps) {
//     const productId = params.id;

//     // pakai service yang sudah dibuat
//     const response = await getProductById(productId);
//     const data = response.data;


//     return (
//         <Modal>
//             <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-3xl md:h-[400px] p-6 dark:border-gray-700 dark:bg-gray-800">
//                 <Image
//                     className="object-cover w-full rounded-lg h-96 md:h-auto md:w-80 bg-white p-4"
//                     src={data.image}
//                     alt={"product image"}
//                     width={500}
//                     height={500}
//                 />
//                 <div className="flex flex-col justify-between p-4 leading-normal">
//                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                         {data.title}
//                     </h5>
//                     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                         {data.description}
//                     </p>
//                     <div className="flex items-center justify-between">
//                         <p className="text-2xl font-bold text-gray-900 dark:text-white">${data.price}</p>
//                         <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// }
