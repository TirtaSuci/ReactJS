import { ProductType } from "@/types/product.type";
import styles from "./product.module.scss";
import Link from "next/link";
import Image from "next/image";

const ProductView = ({ products }: { products: ProductType[] }) => {
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title}>Product Page</h1>
            <div className={styles.product__content}>
                {products?.length > 0 ? (
                    <>
                        {products.map((product: ProductType) => (
                            <Link href={`/product/${product.id}`} key={product.id} className={styles.product__content__item}>
                                <div className={styles.product__content__item__image}>
                                    <Image src={product.image} alt={product.image} width={400} height={400}></Image>
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
                            </Link>
                        ))}
                    </>
                ) : (
                    <div className={styles.product__content__skeleton}>
                        <div className={styles.product__content__skeleton__image} />
                        <div className={styles.product__content__skeleton__name} />
                        <div className={styles.product__content__skeleton__category} />
                        <div className={styles.product__content__skeleton__price} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductView;
