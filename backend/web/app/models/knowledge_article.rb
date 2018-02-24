class KnowledgeArticle < ApplicationRecord
  belongs_to :user
  has_many :workflow_step_knowledge_articles
  has_many :workflow_steps, through: :workflow_step_knowledge_articles
  has_many :file_attachments
  has_many :content_blocks

  validates :title, :user_id, presence: true
end
