class ContentBlock < ApplicationRecord
  has_many :role_content_blocks
  has_many :roles, through: :role_content_blocks
  belongs_to :knowledge_article
end
