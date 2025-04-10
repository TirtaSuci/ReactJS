import { ProductType } from "@/types/product.type";
import ProductView from "@/view/product";


const ProductServer = (props : { products: ProductType[] }) => {
    const { products } = props;
    return (
        <ProductView products={products} />
    )
};

export default ProductServer

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const respose = await res.json();
    return {
        props: { products: respose.data, },
        revalidate: 10
    };
}