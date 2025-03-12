import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductView = () => {
    const [isLogin,setisLogin] = useState(false);
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
export default ProductView;
