class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  def current_user_is_admin?
    render json: {success: false, message: 'You are not authorized to view this content.'} unless current_user.has_role? 'Admin'
  end

end
