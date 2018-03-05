class AddSubmittedToFileAttachment < ActiveRecord::Migration[5.0]
  def change
    add_column :file_attachments, :submitted, :boolean, nil: false, deafult: true
  end
end
