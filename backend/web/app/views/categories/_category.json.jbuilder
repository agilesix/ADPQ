json.extract! category, :id, :name, :description, :created_at, :updated_at
json.url category_url(category, format: :json)

json.file_attachments category.file_attachments do |fa|
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
