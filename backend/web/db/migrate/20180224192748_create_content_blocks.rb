class CreateContentBlocks < ActiveRecord::Migration[5.0]
  def change
    create_table :content_blocks do |t|
      t.text :content
      t.belongs_to :knowledge_article, foreign_key: true

      t.timestamps
    end

    create_table :role_content_blocks do |t|
      t.references :role
      t.references :content_block
    end
    add_index(:role_content_blocks, [ :role_id, :content_block_id ])
  end
end
