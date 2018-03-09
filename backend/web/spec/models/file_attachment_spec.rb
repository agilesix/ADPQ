require 'rails_helper'

RSpec.describe FileAttachment, type: :model do
  it { belong_to :user }
  it { belong_to :category }
  it { belong_to :file_type }
  it { belong_to :knowledge_article }
  it { should validate_presence_of(:attached_file) }
  it { should validate_presence_of(:filename) }
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:category_id) }
  it { should validate_presence_of(:file_type_id) }
  it { should validate_presence_of(:knowledge_article_id) }
end
