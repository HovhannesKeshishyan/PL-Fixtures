"use client"

import type {FC, ReactNode} from "react";

import {ErrorBoundary} from "@/app/components/error-boundary/ErrorBoundary";

interface Props {
    children: ReactNode;
}

export const WithErrorBoundary: FC<Props> = ({children}: Props) => {
    return (
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    )
}