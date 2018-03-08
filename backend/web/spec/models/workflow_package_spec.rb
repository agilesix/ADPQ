require 'rails_helper'

RSpec.describe WorkflowPackage, type: :model do
  it { belong_to :workflow }
  it { belong_to :user }
  it { have_many :workflow_step_packages }
  it { should validate_presence_of(:workflow) }
  it { should validate_presence_of(:user) }
end
