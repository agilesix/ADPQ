class KnowledgeArticle < ApplicationRecord
  belongs_to :user
  has_many :workflow_step_knowledge_articles
  has_many :workflow_steps, through: :workflow_step_knowledge_articles
  has_many :file_attachments, dependent: :delete_all

  validates :title, :user_id, :description, presence: true
end
