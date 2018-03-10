class User < ActiveRecord::Base
  has_many :file_attachments
  has_many :workflow_packages
  has_many :workflow_step_packages
  has_many :package_file_attachments

  rolify before_add: :remove_all_roles
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          #:confirmable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  before_create :set_contributor_role
  after_create :create_workflow_packages

  def set_contributor_role
    add_role 'Contributor'
  end

  #this will be replaced by adding the ability to add workflow packages by workflow through the ui
  def create_workflow_packages
    workflow = Workflow.find_by(name: 'Agile Acquisition Workflow', package_name: 'Solicitation')
    package = WorkflowPackage.create!(name: 'My First Solicitation Package', user: self, workflow: workflow) unless WorkflowPackage.find_by(user: self, workflow: workflow).present?
    WorkflowStep.where(workflow: workflow).each do |wfs|
      WorkflowStepPackage.create!(user: self, workflow_step: wfs, workflow_package: package) unless WorkflowStepPackage.find_by(user: self, workflow_step: wfs, workflow_package: package).present?
    end
  end

  def remove_all_roles(role)
    self.roles.each do |r|
      remove_role r.name
    end
  end

  #override to get user roles in response
  def token_validation_response
    self.as_json(include: :roles, except: [
        :tokens, :created_at, :updated_at
    ])
  end
end
