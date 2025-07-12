import React from "react"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../test/test-utils"
import { mockRewards } from "../../test/factories/rewards";
import { RewardCard } from "./RewardCard"

describe("RewardCard", () => {
    it("renders reward information correctly", () => {
        renderWithProviders(<RewardCard reward={mockRewards[0]} />)

        expect(screen.getByText("Free Coffee")).toBeInTheDocument()
        expect(screen.getByText("Enjoy a hot cup of coffee on us.")).toBeInTheDocument()
        expect(screen.getByText("150 pts")).toBeInTheDocument()
        expect(screen.getByText("Redeem")).toBeInTheDocument()
    })
})
