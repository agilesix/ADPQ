require 'rails_helper'

RSpec.describe WorkflowStepPackage, type: :model do
  it { belong_to :workflow_package }
  it { belong_to :workflow_step }
  it { belong_to :user }
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:workflow_package) }
  it { should validate_presence_of(:workflow_step) }
end
