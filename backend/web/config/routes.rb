require "sidekiq/web"

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  mount Sidekiq::Web => '/sidekiq'

  root 'home#index'
end
