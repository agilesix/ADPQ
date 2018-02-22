require 'rails_helper'

RSpec.describe Role, type: :model do
  it { have_many :users }
  it { belong_to :users }
  it { belong_to :resource }
end
