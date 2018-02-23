class CreateFileAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :file_attachments do |t|
      t.boolean :approved, nil: false, default: false
      t.string :filename
      t.belongs_to :user, foreign_key: true
      t.belongs_to :category, foreign_key: true
      t.belongs_to :file_type, foreign_key: true
      t.belongs_to :knowledge_article, foreign_key: true

      t.timestamps
    end

    #paperclip
    add_attachment :file_attachments, :attached_file
  end
end
