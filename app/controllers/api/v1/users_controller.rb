class Api::V1::UsersController < ApplicationController
  def show_user
    user = User.last
    render json: user
  end
end
