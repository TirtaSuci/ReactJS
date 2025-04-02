import { fetcher } from "@/lib/swr";
import DetailProduct from "@/view/detailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = () => {
    const { query } = useRouter();
    const { data, error, isLoading } = useSWR(
        `/api/products/${query.product}`,
        fetcher
    );
    console.log("data =", data);
    return (
        <div>
            <DetailProduct product={isLoading ? {} : data.data} />
        </div>
    );
}

export default DetailProductPage;
