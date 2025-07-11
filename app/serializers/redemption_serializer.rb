class RedemptionSerializer < ActiveModel::Serializer
  attributes :user_id, :reward_id

  belongs_to :reward
end
