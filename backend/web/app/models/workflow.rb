class Workflow < ApplicationRecord
  belongs_to :workflow_type
  has_many :workflow_steps

  validates :name, :workflow_type, presence: true
end
