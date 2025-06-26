import React from "react";

export default function Dashboard({children, product} : {children: React.ReactNode, product: React.ReactNode}) {
    return (
        <div  className="p-4">
            <div>
                {children}
                {product}
            </div>
        </div>
    );
}