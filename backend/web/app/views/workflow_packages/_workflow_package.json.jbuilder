json.extract! workflow_package, :id, :workflow, :name, :description, :user, :created_at, :updated_at
json.url workflow_package_url(workflow_package, format: :json)
