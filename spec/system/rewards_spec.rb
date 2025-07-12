require "rails_helper"

RSpec.describe "Rewards Redemption", type: :system do
  describe "Home page" do
    before do
      create(:user)
      create(:reward, title: "Free Coffee", cost: 100)
    end

    it "displays available rewards" do
      visit "/"

      expect(page).to have_content("Rewards Redemption")
      expect(page).to have_content("Free Coffee")
      expect(page).to have_button("Redeem")
    end

    it "shows successful message when redeeming a reward" do
      visit "/"

      expect(page).to have_content("Free Coffee")

      click_button "Redeem"

      expect(page).to have_content("Reward redeemed successfully!")
      expect(page).to have_content("900 pts")
    end
  end
end
