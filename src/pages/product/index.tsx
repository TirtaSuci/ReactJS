import { fetcher } from "@/lib/swr";
import ProductView from "@/view/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductPage = () => {
    const [isLogin, setisLogin] = useState(true);
    const { push } = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, []);

    const { data, error, isLoading } = useSWR(
        "/api/products",
        fetcher
    );

    useEffect(() => {
        fetch("api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
            });
    }, []);
    return (
        <ProductView products={isLoading ? [] : data.data}></ProductView>
    );
};
export default ProductPage;
