require 'swagger_helper'

describe 'Package File Attachments API', type: :request do

  #skip for rspec
  before { pending }

  path '/package_file_attachments.json' do
    post 'create' do
      tags 'PackageFileAttachments'

      consumes 'application/json'
      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      parameter name: :package_file_attachment, in: :body, schema: {
          type: :object,
          properties: {
              workflow_step_package_id: {type: :integer},
              filename: {type: :string},
              file_contents: {}
          }
      }

      response '200', 'package file attachment created' do
        let(:package_file_attachment) { {workflow_step_package_id: 1, filename: 'Test File', file_contents: {}} }
        run_test!
      end

    end
  end

end