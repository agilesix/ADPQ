json.extract! knowledge_article, :id, :title, :body, :user, :published, :created_at, :updated_at
json.url knowledge_article_url(knowledge_article, format: :json)

json.file_attachments knowledge_article.file_attachments do |fa|
  json.extract! fa,
                :id,
                :filename,
                :approved,
                :user,
                :category,
                :file_type,
                :knowledge_article,
                :attached_file,
                :attached_file_file_name,
                :attached_file_content_type,
                :attached_file_file_size,
                :attached_file_updated_at,
                :created_at,
                :updated_at
end

json.content_blocks knowledge_article.content_blocks do |cb|

  if cb.roles.any?
    #check if user has any of the roles

    user_has_role = false
    cb.roles.each do |r|
      user_has_role = current_user.has_role? r.name
    end

    if user_has_role
      json.extract! cb,
                    :id,
                    :content,
                    :roles,
                    :knowledge_article,
                    :created_at,
                    :updated_at
    end
  else
    json.extract! cb,
                  :id,
                  :content,
                  :roles,
                  :knowledge_article,
                  :created_at,
                  :updated_at
  end
end


json.workflow_steps knowledge_article.workflow_steps do |wfs|
  json.extract! wfs,
                :id,
                :name,
                :description,
                :created_at,
                :updated_at

  json.workflow wfs.workflow,
                :id,
                :name,
                :description,
                :workflow_type,
                :created_at, :updated_at


end