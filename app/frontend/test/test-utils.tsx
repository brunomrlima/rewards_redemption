import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { UserContext } from "../contexts/UserContext"

export function renderWithProviders(ui: React.ReactElement) {
    const testQueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    })

    const user = {
        userId: 1,
        name: "Test User",
        points: 100,
    }

    return render(
        <QueryClientProvider client={testQueryClient}>
            <UserContext.Provider value={user}>
                {ui}
            </UserContext.Provider>
        </QueryClientProvider>
    )
}
