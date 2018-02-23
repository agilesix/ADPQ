class WorkflowStep < ApplicationRecord
  belongs_to :workflow
  has_many :workflow_step_knowledge_articles
  has_many :knowledge_articles, through: :workflow_step_knowledge_articles

  validates :name, :workflow_id, presence: true
end
