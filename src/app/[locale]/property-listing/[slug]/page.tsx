"use client";
import Properties from "./Properties";
import React, { Suspense } from "react";
import { QueryProvider } from "@/src/app/[locale]/providers/providers";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { slug } = useParams();
  return (
    <Suspense>
      <Properties slug={slug} />
    </Suspense>
  );
}
