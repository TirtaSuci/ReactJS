import styles from "./product.module.scss";

type ProductType = {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
};

const ProductView = ({ products }: { products: ProductType[] }) => {
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title}>Product Page</h1>
            <div className={styles.product__content}>
                {products.map((product: ProductType) => (
                    <div key={product.id} className={styles.product__content__item}>
                        <div className={styles.product__content__item__image}>
                            <img src={product.image} alt={product.image} />
                        </div>
                        <div className={styles.product__content__item__name}>
                            {product.name}
                        </div>
                        <div className={styles.product__content__item__category}>
                            {product.category}
                        </div>
                        <div className={styles.product__content__item__price}>
                            {product.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductView;
