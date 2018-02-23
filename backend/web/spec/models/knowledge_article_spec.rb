require 'rails_helper'

RSpec.describe KnowledgeArticle, type: :model do
  it { have_many :workflow_step_knowledge_articles }
  it { have_many(:workflow_steps).through(:workflow_step_knowledge_articles) }
  it { have_many :file_attachments }
  it { belong_to :user }
end
