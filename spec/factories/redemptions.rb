FactoryBot.define do
  factory :redemption do
    user { create(:user) }
    reward { create(:reward) }
  end
end
