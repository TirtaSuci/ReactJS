export async function getProducts() {
    const res = await fetch("http://localhost:3000/api/product", {
        cache: "no-store", // biar tidak ke-cache
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export async function getProductById(id: string) {
    const res = await fetch(`http://localhost:3000/api/product?id=${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product detail");
    return res.json();
}