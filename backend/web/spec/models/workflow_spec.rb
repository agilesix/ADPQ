require 'rails_helper'

RSpec.describe Workflow, type: :model do
  it { have_many :workflow_steps }
  it { belong_to :workflow_type }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:workflow_type) }
end
