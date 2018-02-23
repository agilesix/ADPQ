class CreateWorkflows < ActiveRecord::Migration[5.0]
  def change
    create_table :workflows do |t|
      t.belongs_to :workflow_type, foreign_key: true
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
