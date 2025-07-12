import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../test/test-utils"
import { getRewards } from "../../api/rewards"
import { mockRewards } from "../../test/factories/rewards";
import Rewards from "./Rewards"

jest.mock("../../api/rewards");

describe("Rewards", () => {
    it("displays loading spinner", async () => {
        (getRewards as jest.Mock).mockReturnValue(new Promise(() => {}))
        renderWithProviders(<Rewards />)

        expect(screen.getByText("Loading...")).toBeInTheDocument()
    })

    it("displays error message on failure", async () => {
        (getRewards as jest.Mock).mockRejectedValueOnce(new Error("Failed to load rewards"))

        renderWithProviders(<Rewards />)

        await waitFor(() => {
            expect(screen.getByText("Failed to load rewards")).toBeInTheDocument()
        })
    })

    it("displays a list of rewards", async () => {
        (getRewards as jest.Mock).mockResolvedValueOnce(mockRewards)

        renderWithProviders(<Rewards />)

        await waitFor(() => {
            expect(screen.getByText("Redeem Your Rewards")).toBeInTheDocument()
            expect(screen.getByText("Free Coffee")).toBeInTheDocument()
            expect(screen.getByText("Gift Card")).toBeInTheDocument()
        })
    })
})
