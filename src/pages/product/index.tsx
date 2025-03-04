import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const [isLogin,setisLogin] = useState(true);
    const { push } = useRouter();

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    },[]);

    return (
        <div>
            <h1>Product Page</h1>
        </div>
    );
};
export default ProductPage;
