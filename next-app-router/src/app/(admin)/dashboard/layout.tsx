import React from "react";

export default function Dashboard({
    children,
    product,
    analytics,
    payment
}: {
    children: React.ReactNode;
    product: React.ReactNode;
    analytics: React.ReactNode;
    payment: React.ReactNode;

}) {
    return (
        <div className="p-4">
            <div>{children}</div>
            <div className="flex justify-center items-center pt-4">
                {product}
                {analytics}
            </div>
            {payment}
        </div>
    );
}
