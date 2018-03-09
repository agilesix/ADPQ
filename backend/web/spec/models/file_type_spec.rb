require 'rails_helper'

RSpec.describe FileType, type: :model do
  it { have_many :file_attachments }
  it { should validate_presence_of(:name) }
end
