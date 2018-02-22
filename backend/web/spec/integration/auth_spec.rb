require 'swagger_helper'

describe 'Authentication API', type: :request do

  path '/auth' do
    post 'create' do
      tags 'User Registration'

      consumes 'application/json'
      produces 'application/json'

      parameter name: :user_registration, in: :body, schema: {
          type: :object,
          properties: {
              email: {type: :string},
              password: {type: :string},
              password_confirmation: {type: :string},
              confirm_success_url: {type: :string},
          }
      }

      response '200', 'user created' do
        let(:blog) { { email: 'test@example.com', password: 'testexample', password_confirmation: 'testexample',  confirm_success_url: 'http://localhost:8080/'} }
        run_test!
      end

    end
  end
end