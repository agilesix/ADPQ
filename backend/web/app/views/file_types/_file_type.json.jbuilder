json.extract! file_type, :id, :name, :description, :created_at, :updated_at, :file_attachments
json.url file_type_url(file_type, format: :json)

json.file_attachments file_type.file_attachments do |fa|
  json.extract! fa,
                :id,
                :approved,
                :filename,
                :user,
                :category,
                :file_type,
                :knowledge_article,
                :attached_file,
                :attached_file_file_name,
                :attached_file_content_type,
                :attached_file_file_size,
                :attached_file_updated_at
end
