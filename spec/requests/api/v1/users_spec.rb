require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /show" do
    it "returns the user data" do
      user = create(:user, name: "Bruno", points: 1000)

      get "/api/v1/users/#{user.id}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to match(
        "id" => user.id,
        "name" => "Bruno",
        "points" => 1000
      )
    end
  end
end
