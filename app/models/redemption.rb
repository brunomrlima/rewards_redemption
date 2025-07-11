class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward

  validate :enough_points

  after_create :update_points

  private

  def enough_points
    return if user.points >= reward.cost

    errors.add(:base, "Not enough points to redeem this reward")
  end

  def update_points
    user.points -= reward.cost

    user.save
  end
end
