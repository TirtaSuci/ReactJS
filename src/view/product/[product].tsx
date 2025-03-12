import { useRouter } from "next/router";

const DetailProductPage = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Detail Product Page</h1>
            <p>Detail Product : {router.query.product} </p>
        </div>
    );
};
export default DetailProductPage;