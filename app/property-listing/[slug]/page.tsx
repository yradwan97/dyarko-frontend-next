'use client'
import Properties from "./Properties";
import React, { Suspense } from "react";
import { QueryProvider } from "@/app/providers/providers";
import { useParams } from "next/navigation";

export default function Page() {
    const {slug} = useParams()
    return (
        <Suspense>
            <Properties slug={slug}/>
        </Suspense>
    )
}