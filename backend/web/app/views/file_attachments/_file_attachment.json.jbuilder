json.extract! file_attachment, :id, :approved, :filename, :user, :category, :file_type,
              :created_at, :updated_at,
              :attached_file,
              :attached_file_file_name,
              :attached_file_content_type,
              :attached_file_file_size,
              :attached_file_updated_at
json.url file_attachment_url(file_attachment, format: :json)

json.knowledge_article file_attachment.knowledge_article, :id, :title, :body, :user, :published, :created_at, :updated_at

json.workflow_steps file_attachment.knowledge_article.workflow_steps do |wfs|
  json.extract! wfs,
      :id,
      :name,
      :description,
      :workflow

end