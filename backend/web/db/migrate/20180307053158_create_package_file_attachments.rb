class CreatePackageFileAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :package_file_attachments do |t|
      t.string :filename
      t.belongs_to :workflow_step_package, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end

    #paperclip
    add_attachment :package_file_attachments, :attached_file
  end
end
