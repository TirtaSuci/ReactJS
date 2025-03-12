import ProductView from "@/view/product";
import DetailProductPage from "@/view/product/[product]";

const ProductPage = () => {
    return (
        <div>
            <ProductView></ProductView>
            {/* <DetailProductPage></DetailProductPage> */}
        </div>
    );
};
export default ProductPage;