require 'swagger_helper'

describe 'Workflow Step API', type: :request do

  #skip for rspec
  before { pending }

  path '/workflow_steps.json' do
    get 'index' do
      tags 'WorkflowSteps'

      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      response '200', 'workflow steps retrieved' do
        run_test!
      end

    end


  end
  path '/workflow_steps/{id}.json' do
    get 'show/{id}.json' do
      tags 'WorkflowSteps'

      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string
      parameter name: 'id', :in => :path, :type => :string

      response '200', 'workflow step retrieved' do
        let(:id) { 1 }
        run_test!
      end
    end
  end
end