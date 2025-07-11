require 'rails_helper'

RSpec.describe Redemption, type: :model do
  describe "validations" do
    context "#enough_points" do
      it "redeems with enough points" do
        user = create(:user, points: 200)
        reward = create(:reward, cost: 200)
        redemption = build(:redemption, reward: reward, user: user)

        expect(redemption.valid?).to be_truthy
      end

      it "can't redeem without enough points" do
        user = create(:user, points: 100)
        reward = create(:reward, cost: 200)
        redemption = build(:redemption, reward: reward, user: user)

        expect(redemption.valid?).to be_falsy
        expect(redemption.errors.full_messages).to include("Not enough points to redeem this reward")
      end
    end
  end

  it "update user points when redeeming" do
    user = create(:user, points: 300)
    reward = create(:reward, cost: 200)

    expect {
      create(:redemption, reward: reward, user: user)
    }.to change { user.points }.from(300).to(100)
  end
end
