class Api::V1::RedemptionsController < ApplicationController
  def create
    redemption = Redemption.new(redeem_params)

    if redemption.save
      render json: redemption, status: :created
    else
      render json: { errors: redemption.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def redeem_params
    params.require(:reward_redemption).permit(:user_id, :reward_id)
  end
end
