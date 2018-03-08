require 'rails_helper'

RSpec.describe PackageFileAttachment, type: :model do
  it { belong_to :user }
  it { belong_to :workflow_step_package }
  it { should validate_presence_of(:attached_file) }
  it { should validate_presence_of(:filename) }
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:workflow_step_package) }
end
