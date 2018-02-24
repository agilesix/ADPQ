json.extract! workflow_step, :id, :workflow_id, :name, :description, :created_at, :updated_at
json.url workflow_step_url(workflow_step, format: :json)

json.knowledge_articles workflow_step.knowledge_articles do |ka|
  json.extract! ka,
                :id,
                :title,
                :body,
                :user,
                :published,
                :created_at,
                :updated_at,
                :file_attachments

end

json.workflow workflow_step.workflow,
              :id,
              :name,
              :description,
              :workflow_type,
              :created_at, :updated_at
