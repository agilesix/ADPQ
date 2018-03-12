require 'swagger_helper'

describe 'Workflow Packages API', type: :request do

  #skip for rspec
  before { pending }

  path '/workflow_packages.json' do
    get 'index' do
      tags 'WorkflowPackages'

      consumes 'application/json'
      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      parameter name: :workflow_id, in: :path, type: :integer

      response '200', 'user\'s workflow packages for workflow retrieved' do
        let(:workflow_id) { 1 }
        run_test!
      end

    end
  end

end