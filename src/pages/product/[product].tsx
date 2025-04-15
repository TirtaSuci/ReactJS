import { fetcher } from "@/lib/swr";
import { ProductType } from "@/types/product.type";
import DetailProduct from "@/view/detailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = ({
    product,
    notFound,
}: {
    product: ProductType | null;
    notFound: boolean;
}) => {
    const router = useRouter();
    const slug = router.query.product;

    const productId = Array.isArray(slug) ? slug[0] : slug;

    const { data, error, isLoading } = useSWR(
        productId ? `/api/products/${productId}` : null,
        fetcher
    );

    // Error dari server (SSR)
    if (notFound) {
        return <div>Produk tidak ditemukan (SSR)</div>;
    }

    // Error dari client (CSR)
    if (error) {
        return <div>Gagal memuat produk (CSR)</div>;
    }

    return (
        <div>
            <DetailProduct product={isLoading ? {} : data?.data || product} />
        </div>
    );
};

export async function getServerSideProps({ params }: { params: { product: string[] | string } }) {
    const slug = Array.isArray(params.product) ? params.product[0] : params.product;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`);

        if (!res.ok) {
            // Jika 404 atau error lain
            return {
                props: {
                    product: null,
                    notFound: true,
                },
            };
        }

        const respose = await res.json();

        // Jika data null atau kosong
        if (!respose.data) {
            return {
                props: {
                    product: null,
                    notFound: true,
                },
            };
        }

        return {
            props: {
                product: respose.data,
                notFound: false,
            },
        };
    } catch (error) {
        return {
            props: {
                product: null,
                notFound: true,
            },
        };
    }
}

export default DetailProductPage;
