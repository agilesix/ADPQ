class CreateWorkflowPackages < ActiveRecord::Migration[5.0]
  def change
    create_table :workflow_packages do |t|
      t.belongs_to :workflow, foreign_key: true
      t.string :name
      t.string :description
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
