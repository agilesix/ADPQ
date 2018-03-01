class User < ActiveRecord::Base
  rolify
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          #:confirmable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  before_create :set_contributor_role

  def set_contributor_role
    add_role 'Contributor'
  end

  #override to get user roles in response
  def token_validation_response
    self.as_json(include: :roles, except: [
        :tokens, :created_at, :updated_at
    ])
  end
end
