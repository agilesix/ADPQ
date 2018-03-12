require 'swagger_helper'

describe 'Workflow Step Packages API', type: :request do

  #skip for rspec
  before { pending }

  path '/workflow_step_packages.json' do
    get 'index' do
      tags 'WorkflowStepPackages'

      consumes 'application/json'
      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      parameter name: :workflow_package_id, in: :path, type: :integer

      response '200', 'user\'s workflow step packages for workflow package retrieved' do
        let(:workflow_package_id) { 1 }
        run_test!
      end

    end
  end

end