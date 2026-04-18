"use client"

import type {FC, ReactNode} from "react";

import {ErrorBoundary} from "./ErrorBoundary";

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