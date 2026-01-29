"use client";
import { FormspreeProvider } from "@formspree/react";
import React from "react";

export function FormpsreeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
