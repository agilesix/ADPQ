require 'rails_helper'

RSpec.describe FileType, type: :model do
  it { have_many :file_attachments }
end
