import { ProductType } from "@/types/product.type";
import styles from "./detailProduct.module.scss";

const DetailProduct = ({ product }: { product: ProductType }) => {
    console.log("product= ", product);
    return (
        <div className={styles.productDetail}>
            {product && Object.keys(product).length > 0 ?
                <>
                    <h1>Detail Product Page</h1>
                    <div className={styles.productDetail__image}>
                        <img
                            src={product.image && product.image}
                            alt={product.name || "Product Image"}
                        />
                    </div>
                    <div className={styles.productDetail__name}>
                        {product.name}
                    </div>
                    <div className={styles.productDetail__category}>
                        {product.category}
                    </div>
                    <div className={styles.productDetail__price}>
                        {product.price && product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}
                    </div></> : <><div className={styles.product__content__skeleton}>
                        <div className={styles.product__content__skeleton__image} />
                        <div className={styles.product__content__skeleton__name} />
                        <div className={styles.product__content__skeleton__category} />
                        <div className={styles.product__content__skeleton__price} />
                    </div></>}

        </div>
    );
};

export default DetailProduct;
