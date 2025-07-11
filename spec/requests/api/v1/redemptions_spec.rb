require 'rails_helper'

RSpec.describe "Api::V1::Redemptions", type: :request do
  describe "GET /api/v1/redemptions" do
    it "returns the user's redemption history" do
      current_user, another_user = create_list(:user, 2)
      reward = create(:reward)
      create(:redemption, user: current_user, reward: reward)
      create(:redemption, user: another_user, reward: reward)

      get "/api/v1/redemptions", params: { user_id: current_user.id }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to contain_exactly(
        {
          "user_id" => current_user.id,
          "reward_id" => reward.id,
          "reward" => {
            "id" => reward.id,
            "title" => reward.title,
            "description" => reward.description,
            "cost" => reward.cost
          }
        }
      )
    end
  end

  describe "POST /api/v1/redemptions" do
    let(:user) { create(:user, points: 1000) }
    let(:reward) { create(:reward, cost: 300) }

    it "creates a redemption and deducts points" do
      expect {
        post "/api/v1/redemptions", params: { user_id: user.id, redemption: { reward_id: reward.id } }
      }.to change(Redemption, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json).to match({
        "user_id" => user.id,
        "reward_id" => reward.id,
        "reward" => {
          "id" => reward.id,
          "title" => reward.title,
          "description" => reward.description,
          "cost" => reward.cost
        }
      })
    end

    it "returns error if user does not have enough points" do
      user.update(points: 100)

      expect {
        post "/api/v1/redemptions", params: { user_id: user.id, redemption: { reward_id: reward.id } }
      }.to_not change(Redemption, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Not enough points to redeem this reward")
    end
  end
end
