class WorkflowType < ApplicationRecord
  has_many :workflows

  validates :name, presence: true
end
