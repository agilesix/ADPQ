class CanController < ApplicationController
  # Do not authenticate, just don't allow access to anything
  # before_action :authenticate_user!
  before_action :can_params

  # GET /can.json
  def can
    if !current_user.nil? && params[:operation].present? && params[:resource].present?
      ability = Ability.new(current_user)
      if params[:resource_id].present?
        render json:
          '{ "can" : ' +
          ability.can?(params[:operation], params[:resource], :id => params[:resource_id]).to_s +
          '}'
      else
        render json:
          '{ "can" : ' +
          ability.can?(params[:operation], params[:resource]).to_s +
          '}'
      end
    else
      render json: '{ "can" : false }'
    end
  end


  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def can_params
      params.require(:operation)
      params.require(:resource)
      params.permit(:resource_id)
    end
end
