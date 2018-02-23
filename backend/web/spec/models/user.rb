require 'rails_helper'

RSpec.describe User, type: :model do
  it { have_many :roles }
  it { belong_to :roles }

  it 'should return json when validating a token' do
    user = FactoryBot.create :user
    expect(user.token_validation_response['email']). to eq(user.email)
  end
end