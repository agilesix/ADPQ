require "sidekiq/web"

Rails.application.routes.draw do
  resources :content_blocks
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

  root 'home#index'
end
