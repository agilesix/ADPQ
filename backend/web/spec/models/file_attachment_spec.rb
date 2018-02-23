require 'rails_helper'

RSpec.describe FileAttachment, type: :model do
  it { belong_to :user }
  it { belong_to :category }
  it { belong_to :file_type }
  it { belong_to :knowledge_article }
end
