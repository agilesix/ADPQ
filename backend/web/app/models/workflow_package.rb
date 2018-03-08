class WorkflowPackage < ApplicationRecord
  belongs_to :workflow
  belongs_to :user
  has_many :workflow_step_packages

  validates :workflow, :user, presence: true
end
