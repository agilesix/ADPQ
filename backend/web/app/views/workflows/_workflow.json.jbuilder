json.extract! workflow, :id, :workflow_type, :name, :description, :created_at, :updated_at
json.url workflow_url(workflow, format: :json)


json.workflow_steps workflow.workflow_steps do |wfs|
  json.extract! wfs,
                :id,
                :name,
                :description,
                :created_at,
                :updated_at

  json.knowledge_articles wfs.knowledge_articles do |ka|
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
end
