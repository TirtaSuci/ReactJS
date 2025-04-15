import { fetcher } from "@/lib/swr";
import { ProductType } from "@/types/product.type";
import DetailProduct from "@/view/detailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";
import Navbar from "../componens/layouts/navbar";

const DetailProductPage = ({ product }: { product: ProductType }) => {
    const { query } = useRouter();

    // client-side
    const { data, error, isLoading } = useSWR(
        `/api/products/${query.product}`,
        fetcher
    );
    console.log("data =", data);
    return (
        <div>
            <DetailProduct product={isLoading ? {} : data.data} />
            {/* <DetailProduct product={product} /> */}
        </div>
    );
}

export async function getServerSideProps({ params }: { params: { product: string } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.product}`);
    const respose = await res.json();
    return {
        props: {
            product: respose.data,
        }
    };
}

// export async function getStaticProps({ params }: { params: { product: string } }) {
//     const res = await fetch(`http://localhost:3000/api/products/${params.product}`);
//     const respose = await res.json();
//     return {
//         props: { product: respose.data, }
//     };
// }

// export async function getStaticPaths() {
//     const res = await fetch('http://localhost:3000/api/products');
//     const respose = await res.json();
//     const paths = respose.data.map((product: ProductType) => ({
//         params: { product: product.id, }
//     }));
//     return {
//         paths, fallback: false
//     }
// }

export default DetailProductPage;