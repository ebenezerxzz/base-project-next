import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

type AppProvidersProps = {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProvidersProps) => {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}