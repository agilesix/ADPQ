require 'rails_helper'

RSpec.describe User, type: :model do
  it { have_many :roles }
  it { have_many :file_attachments }
  it { have_many :workflow_step_packages }
  it { have_many :package_file_attachments }
  it { belong_to :roles }

  it 'should return json when validating a token' do
    user = FactoryBot.create :user
    expect(user.token_validation_response['email']).to eq(user.email)
  end
end