require "sidekiq/web"

Rails.application.routes.draw do
  resources :file_types
  resources :categories
  resources :file_attachments
  resources :knowledge_articles
  resources :workflow_steps
  resources :workflows
  resources :workflow_types
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  mount_devise_token_auth_for 'User', at: 'auth'
  mount Sidekiq::Web => '/sidekiq'

  # Authorization check
  # can?operation=read&resource=KnowledgeArticle&resource_id=42
  # For opetations see models/abilty.rb. Examples: read, manage
  get '/can', to: 'can#can'

  root 'home#index'
end
