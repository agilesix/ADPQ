require 'swagger_helper'

describe 'Knowledge Article API', type: :request do

  #skip for rspec
  before { pending }

  path '/knowledge_articles.json' do
    get 'index' do
      tags 'KnowledgeArticles'

      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      response '200', 'knowledge article steps retrieved' do
        run_test!
      end

    end


  end

  path '/knowledge_articles/{id}.json' do
    get 'show/{id}.json' do
      tags 'KnowledgeArticles'

      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string
      parameter name: 'id', :in => :path, :type => :string

      response '200', 'knowledge article step retrieved' do
        let(:id) { 1 }
        run_test!
      end
    end
  end

  path '/knowledge_articles.json' do
    post 'create' do
      tags 'KnowledgeArticles'

      consumes 'application/json'
      produces 'application/json'

      parameter name: 'access-token', :in => :header, :type => :string
      parameter name: 'client', :in => :header, :type => :string
      parameter name: 'uid', :in => :header, :type => :string

      parameter name: :knowledge_article, in: :body, schema: {
          type: :object,
          properties: {
              user_id: {type: :integer},
              title: {type: :string},
              body: {type: :string},
              published: {type: :boolean},
              workflow_step_id: {type: :integer}
          }
      }

      response '200', 'knowledge article created' do
        let(:knowledge_article) { { user_id: 1, title: 'The Best Knowledge Article', body: 'Knowledge Article Content', published: false, workflow_step_id: 1} }
        run_test!
      end

    end
  end
end