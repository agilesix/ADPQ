class CreateWorkflowStepPackages < ActiveRecord::Migration[5.0]
  def change
    create_table :workflow_step_packages do |t|
      t.belongs_to :workflow_package, foreign_key: true
      t.references :workflow_step, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
