import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../test/test-utils";
import { getRedemptions } from "../../api/redemptions"
import { mockRedemptions } from "../../test/factories/redemptions";
import Redemptions from "./Redemptions"

jest.mock("../../api/redemptions")

describe("Redemptions", () => {
    it("displays redemptions after successful fetch", async () => {
        (getRedemptions as jest.Mock).mockResolvedValueOnce(mockRedemptions)

        renderWithProviders(<Redemptions />)

        await waitFor(() => {
            expect(screen.getByText("Free Coffee")).toBeInTheDocument()
            expect(screen.getByText("Movie Ticket")).toBeInTheDocument()
        })
    })

    it("displays loading state", () => {
        (getRedemptions as jest.Mock).mockReturnValue(new Promise(() => {})) // never resolves

        renderWithProviders(<Redemptions />)

        expect(screen.getByText("Loading...")).toBeInTheDocument()
    })

    it("shows error message on API failure", async () => {
        (getRedemptions as jest.Mock).mockRejectedValue(new Error("Failed to fetch redemptions"))

        renderWithProviders(<Redemptions />)

        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent("Failed to fetch redemptions");
        })
    })
})
