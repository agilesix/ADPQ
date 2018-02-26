FactoryBot.define do
  factory :knowledge_article do
    title "Test Knowledge Article"
    description "Knowledge Article Description"
    body "Test Knowledge Article Body"
    association :user
    published false
  end
end
