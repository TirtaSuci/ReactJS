import { fetcher } from "@/lib/swr";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = () => {
    const { query } = useRouter();
    const { data, error, isLoading } = useSWR(
        `/api/products${query.product}`,
        fetcher
    );
    return (
        <div>
            <h1>Detail Product Page</h1>
            <p>Product : {query.product}</p>
        </div>
    );
};