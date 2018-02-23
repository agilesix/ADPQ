FactoryBot.define do
  factory :knowledge_article do
    title "Test Knowledge Article"
    body "Test Knowledge Article Body"
    association :user
    published false
  end
end
