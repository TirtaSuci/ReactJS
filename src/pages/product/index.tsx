import { fetcher } from "@/lib/swr";
import ProductView from "@/view/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductPage = () => {
    const [isLogin, setisLogin] = useState(true);
    const { push } = useRouter();
    const [products, setProducts] = useState([]);

    const { data, error, isLoading } = useSWR("/api/products", fetcher);

    return (
        <ProductView products={isLoading ? [] : data?.data} />
    );
};
export default ProductPage;
