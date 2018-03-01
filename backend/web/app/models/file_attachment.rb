class FileAttachment < ApplicationRecord
  has_attached_file :attached_file
  do_not_validate_attachment_file_type :attached_file, :content_type => ["application/pdf", "application/vnd.ms-excel",
                                                                         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                                                         "application/msword",
                                                                         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                                         "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                                                                         "application/vnd.ms-word.document.macroEnabled.12",
                                                                         "application/vnd.ms-word.template.macroEnabled.12",
  ]
  belongs_to :user
  belongs_to :category
  belongs_to :file_type
  belongs_to :knowledge_article

  validates :attached_file, :filename, :user, :category_id, :file_type_id, :knowledge_article_id, presence: true

  scope :approved, -> (approved) { where approved: approved }
end
