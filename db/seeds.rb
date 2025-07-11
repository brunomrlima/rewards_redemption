puts "Seeding database..."

Redemption.destroy_all
Reward.destroy_all
User.destroy_all

users = User.create!([
  { name: "Bruno Monteiro", points: 1500 }
])
puts "Created #{users.count} users"

rewards = Reward.create!([
  { title: "Coffee Voucher", description: "Get a free coffee at any local café", cost: 200 },
  { title: "Amazon Gift Card", description: "$10 Amazon gift card", cost: 500 },
  { title: "Movie Ticket", description: "One ticket for any movie at Cineplex", cost: 300 },
  { title: "Tech T-Shirt", description: "Cool T-shirt from your favorite tech company", cost: 700 }
])
puts "Created #{rewards.count} rewards"

puts "Done!"
