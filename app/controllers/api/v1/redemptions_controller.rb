class Api::V1::RedemptionsController < ApplicationController
  before_action :set_user

  def index
    redemptions = @user.redemptions
    render json: redemptions
  end
  def create
    redemption = Redemption.new(redemption_params)
    redemption.user = @user

    if redemption.save
      render json: redemption, status: :created
    else
      render json: { errors: redemption.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def redemption_params
    params.require(:redemption).permit(:reward_id)
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end
