require 'rails_helper'

RSpec.describe "Api::V1::Rewards", type: :request do
  describe "GET /index" do
    it "returns list of rewards" do
      reward = create(:reward, title: "Free Coffee", description: "Enjoy a free coffee on us", cost: 100)

      get "/api/v1/rewards"

      expect(response).to have_http_status(:ok)

      puts response.body
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json).to contain_exactly({
        "title" => reward.title,
        "description" => reward.description,
        "cost" => reward.cost
      })
    end
  end
end
