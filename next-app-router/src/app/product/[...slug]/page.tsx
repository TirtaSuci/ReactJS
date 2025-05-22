type DetailProductPageProps = { params: { slug: string[] } };

export default function DetailProductPage(props: DetailProductPageProps) {
    const { params } = props
    console.log(params)
    return (
        <>
            <p>Detail Product Page</p>
            <h1>{params.slug[0]}</h1>
            <h1>{params.slug[1]}</h1>
            <h1>{params.slug[2]}</h1>
        </>
    );
}