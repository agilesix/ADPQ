json.extract! workflow, :id, :workflow_type, :name, :description, :created_at, :updated_at
json.url workflow_url(workflow, format: :json)

json.users_count User.all.count if current_user.has_role? 'Admin'

knowledge_articles_count = 0
files_count = 0
file_submissions_count = 0

json.workflow_steps workflow.workflow_steps do |wfs|
  ws_files_count = 0
  ws_file_submissions_count = 0

  knowledge_articles_count += wfs.knowledge_articles.count

  json.extract! wfs,
                :id,
                :name,
                :description,
                :created_at,
                :updated_at

  json.knowledge_articles wfs.knowledge_articles do |ka|
    file_attachments = ka.file_attachments.where(approved: true)
    json.extract! ka,
                  :id,
                  :title,
                  :description,
                  :body,
                  :user,
                  :published,
                  :created_at,
                  :updated_at

    files_count += file_attachments.count
    ws_files_count += file_attachments.count

    submissions_count = file_attachments.where(submitted: true).count
    file_submissions_count += submissions_count
    ws_file_submissions_count += submissions_count
  end

  json.files_count ws_files_count if current_user.has_role? 'Admin'
  json.file_submissions_count ws_file_submissions_count if current_user.has_role? 'Admin'
end

json.knowledge_articles_count knowledge_articles_count
json.files_count files_count if current_user.has_role? 'Admin'

json.file_submissions_count file_submissions_count if current_user.has_role? 'Admin'