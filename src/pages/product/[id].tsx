import { useRouter } from "next/router";

const DetailProductPage = () => {
    const router = useRouter();
    console.log(router);
    return (
        <div>
            <h1>Detail Product Page</h1>
            <p>Detail Product : </p>
        </div>
    );
};
export default DetailProductPage;