import React from "react"
import { render, screen } from "@testing-library/react"
import { RedemptionCard } from "./RedemptionCard"
import { mockRedemptions } from "../../test/factories/redemptions";

describe("RedemptionCard", () => {
    it("renders the reward title, description, and cost", () => {
        render(<RedemptionCard redemption={mockRedemptions[0]} />)

        expect(screen.getByText("Free Coffee")).toBeInTheDocument()
        expect(
            screen.getByText("Enjoy a free coffee on us.")
        ).toBeInTheDocument()
        expect(screen.getByText("Redeemed for 100 pts")).toBeInTheDocument()
    })
})
