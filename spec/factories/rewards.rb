FactoryBot.define do
  factory :reward do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    cost { 200 }
  end
end
