import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../test/test-utils"
import { createRedemption } from "../../api/redemptions"
import toast from "react-hot-toast"
import RedeemButton from "./RedeemButton"

jest.mock("../../api/redemptions");
jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe("RedeemButton", () => {
    it("calls createRedemption and shows success toast", async () => {
        renderWithProviders(<RedeemButton rewardId={42} />)

        await userEvent.click(screen.getByRole("button", { name: "Redeem" }))

        await waitFor(() => {
            expect(createRedemption).toHaveBeenCalledWith(42, 1)
            expect(toast.success).toHaveBeenCalledWith("Reward redeemed successfully!")
        })
    })

    it("shows error toast when API fails", async () => {
        (createRedemption as jest.Mock).mockRejectedValueOnce(new Error("Something went wrong"))

        renderWithProviders(<RedeemButton rewardId={42} />)

        await userEvent.click(screen.getByRole("button", { name: "Redeem" }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong")
        })
    })
})
