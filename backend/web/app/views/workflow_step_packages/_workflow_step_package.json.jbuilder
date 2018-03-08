json.extract! workflow_step_package, :id, :workflow_package, :workflow_step, :user, :created_at, :updated_at
json.url workflow_step_package_url(workflow_step_package, format: :json)

json.knowledge_articles workflow_step_package.workflow_step.knowledge_articles

json.workflow workflow_step_package.workflow_step.workflow

json.package_file_attachments workflow_step_package.package_file_attachments do |fa|
  json.extract! fa,
                :id,
                :filename,
                :user,
                :attached_file,
                :attached_file_file_name,
                :attached_file_content_type,
                :attached_file_file_size,
                :attached_file_updated_at,
                :created_at,
                :updated_at
end
