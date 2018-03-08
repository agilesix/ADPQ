require 'rails_helper'

RSpec.describe WorkflowType, type: :model do
  it { have_many :workflows }
  it { should validate_presence_of(:name) }
end
