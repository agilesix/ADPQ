class AddPackageNameToWorkflow < ActiveRecord::Migration[5.0]
  def change
    add_column :workflows, :package_name, :string
  end
end
