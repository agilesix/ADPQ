class PackageFileAttachment < ApplicationRecord
  has_attached_file :attached_file
  do_not_validate_attachment_file_type :attached_file

  belongs_to :workflow_step_package
  belongs_to :user


  validates :attached_file, :user, :workflow_step_package, :filename, presence: true
end
