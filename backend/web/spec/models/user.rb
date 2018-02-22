require 'rails_helper'

RSpec.describe User, type: :model do
  it { have_many :roles }
  it { belong_to :roles }
end