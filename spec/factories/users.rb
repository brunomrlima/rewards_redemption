FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    points { 1000 }
  end
end
