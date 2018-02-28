require "sidekiq/web"

Rails.application.routes.draw do
  resources :file_types
  resources :categories
  resources :file_attachments do
    collection do
      post 'create/multiple', to: 'file_attachments#create_multiple'
    end
  end
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
