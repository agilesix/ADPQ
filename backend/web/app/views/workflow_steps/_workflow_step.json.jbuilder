json.extract! workflow_step, :id, :workflow_id, :name, :description, :created_at, :updated_at
json.url workflow_step_url(workflow_step, format: :json)

files_count = 0
file_submissions_count = 0

json.knowledge_articles_count workflow_step.knowledge_articles.count

json.knowledge_articles workflow_step.knowledge_articles do |ka|
  json.extract! ka,
                :id,
                :title,
                :description,
                :body,
                :user,
                :published,
                :created_at,
                :updated_at

  file_attachments = ka.file_attachments.where(approved: true)
  json.file_attachments file_attachments
  file_submissions = ka.file_attachments.where(approved: false, submitted: true)
  json.file_submissions file_submissions do |file_attachment|
    json.extract! file_attachment, :id, :approved, :filename, :user, :category, :file_type,
      		  :created_at, :updated_at,
                  :attached_file,
                  :attached_file_file_name,
                  :attached_file_content_type,
                  :attached_file_file_size,
                  :attached_file_updated_at
  end


  files_count += file_attachments.count
  file_submissions_count += file_submissions.count

end

json.files_count files_count if current_user.has_role? 'Admin'
json.file_submissions_count file_submissions_count if current_user.has_role? 'Admin'

json.workflow workflow_step.workflow,
              :id,
              :name,
              :description,
              :workflow_type,
              :created_at, :updated_at
