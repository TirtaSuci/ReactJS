import { useRouter } from "next/router";

const ShopPage = () => {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            <h1>Shop Page</h1>
            <p>Shop : {`${router.query.slug && router.query.slug[0] + " - " + router.query.slug[1]}`}</p>
        </div>
    );
};
export default ShopPage;