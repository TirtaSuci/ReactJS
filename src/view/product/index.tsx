import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type productType = {
    id: number;
    name: string;
    price: number;
    size: string;
};

const ProductView = () => {
    const [isLogin, setisLogin] = useState(true);
    const { push } = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);

    useEffect(() => {
        fetch("api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
            });
    },[]);
    return (
        <div>
            <h1>Product Page</h1>
            {products.map((products: productType) => (
                <div key={products.id}>{products.name}</div>
            ))}
        </div>
    );
};
export default ProductView;
