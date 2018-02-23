class Category < ApplicationRecord
  has_many :file_attachments
  validates :name, presence: true
end
