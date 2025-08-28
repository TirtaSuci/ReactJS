import { getProducts } from "@/app/services/products/products";
import Link from "next/link";

type ProductPageProps = { params: { slug: string[] } };

type Product = {
    id: string;
    title: string;
    image: string;
    price: number;
    // tambahkan properti lain sesuai kebutuhan
};

export default async function ProductPage(props: ProductPageProps) {
    const { params } = props;
    const { data: products } = await getProducts();
    return (
        <div className="w-full h-100 p-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-300 mr-4">
            {/* <h1>{params.slug ? "Detail Product Page " : "Product Page"}</h1> */}
            {products.length > 0 &&
                products.map((product: Product) => (
                    <Link
                        href={`/product/detail/${product.id}`}
                        key={product.id}
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                        <img
                            className="p-8 rounded-t-lg object-cover h-50 w-full"
                            src={product.image}
                            alt="product image"
                            width={500}
                            height={500}
                        />
                        <div className="px-5 pb-5">
                            <div>
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                                    {product.title}
                                </h5>
                            </div>
                            <div className="flex items-center mt-2.5 mb-5"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    ${product.price}
                                </span>
                                <div
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Add to cart
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            {params.slug && (
                <>
                    <p>Detail Product Page</p>
                    <p>{params.slug[0]}</p>
                    <p>{params.slug[1]}</p>
                    <p>{params.slug[2]}</p>
                </>
            )}
        </div>
    );
}
