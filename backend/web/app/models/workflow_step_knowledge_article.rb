
class WorkflowStepKnowledgeArticle < ApplicationRecord
  belongs_to :workflow_step
  belongs_to :knowledge_article
end