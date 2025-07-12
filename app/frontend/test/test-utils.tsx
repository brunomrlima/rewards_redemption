import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { UserContext } from "../contexts/UserContext"
import { mockUser } from "./factories/user";

export function renderWithProviders(ui: React.ReactElement) {
    const testQueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    })

    return render(
        <QueryClientProvider client={testQueryClient}>
            <UserContext.Provider value={mockUser}>
                {ui}
            </UserContext.Provider>
        </QueryClientProvider>
    )
}
