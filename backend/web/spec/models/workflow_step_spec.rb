require 'rails_helper'

RSpec.describe WorkflowStep, type: :model do
  it { have_many :workflow_step_knowledge_articles }
  it { have_many(:knowledge_articles).through(:workflow_step_knowledge_articles) }
  it { belong_to :workflow }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:workflow_id) }
end
