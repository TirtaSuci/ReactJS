import { ProductType } from "@/types/product.type";
import ProductView from "@/view/product";


const ProductServer = (props : { products: ProductType[] }) => {
    const { products } = props;
    return (
        <ProductView products={products} />
    )
};

export default ProductServer

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const respose = await res.json();
    return {
        props: { products: respose.data, }
    };
}