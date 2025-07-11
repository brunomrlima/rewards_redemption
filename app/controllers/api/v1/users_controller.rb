class Api::V1::UsersController < ApplicationController
  def show
    user = User.find_by(user_params)
    render json: user
  end

  private

  def user_params
    params.permit(:id)
  end
end
