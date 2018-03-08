require 'rails_helper'

RSpec.describe KnowledgeArticle, type: :model do
  it { have_many :workflow_step_knowledge_articles }
  it { have_many(:workflow_steps).through(:workflow_step_knowledge_articles) }
  it { have_many :file_attachments }
  it { belong_to :user }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:description) }

end
