json.extract! workflow_type, :id, :name, :description, :created_at, :updated_at
json.url workflow_type_url(workflow_type, format: :json)

json.workflows workflow_type.workflows do |wf|
  json.extract! wf,
                :id,
                :name,
                :description,
                :created_at, :updated_at

  json.workflow_steps wf.workflow_steps do |wfs|
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
end

