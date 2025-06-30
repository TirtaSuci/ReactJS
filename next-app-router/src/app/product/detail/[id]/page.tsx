import { getData } from "../../../services/products";

type ProductPageProps = {
    params: { id: string };
};

export default async function DetailProductPage({ params }: ProductPageProps) {
    const productId = params.id;

    const data = await getData(`https://fakestoreapi.com/products/${productId}`);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-100 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center rounded-t-lg items-center h-100 bg-white">
                    <img
                        className="h-80 object-cover bg-gray-500"
                        src={data.image}
                        alt={data.title}
                    />
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${data.price}</span>
                        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <p>Add to cart</p>
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
