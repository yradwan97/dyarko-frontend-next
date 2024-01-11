'use client'
import PropertyDetails from "./PropertyDetails";
import React from "react";
import {QueryProvider} from "../../providers/providers"
import { useParams } from "next/navigation";

export default function Page() {
    const {slug} = useParams()
    return (
        <QueryProvider>
            <PropertyDetails slug={slug} />
        </QueryProvider>
    )
}