require 'rails_helper'

RSpec.describe Category, type: :model do
  it { have_many :file_attachments }
end
