class WorkflowStepPackage < ApplicationRecord
  belongs_to :workflow_package
  belongs_to :workflow_step
  belongs_to :user
  has_many :package_file_attachments

  validates :user, :workflow_package, :workflow_step, presence: true
end
