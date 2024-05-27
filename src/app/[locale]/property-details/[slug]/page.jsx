'use client'
import PropertyDetails from "./PropertyDetails";
import React, { Suspense } from "react";
import { QueryProvider } from "../../providers/providers"
import { useParams } from "next/navigation";

export default function Page() {
    const { slug } = useParams()
    return (
        <Suspense>
            <PropertyDetails slug={slug} />
        </Suspense>
    )
}