class FileType < ApplicationRecord
  has_many :file_attachments
  validates :name, presence: true
end
