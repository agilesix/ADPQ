FactoryBot.define do
  factory :workflow_step do
    association :workflow
    name "Test Workflow Step"
    description "Test Workflow Step Description"
  end
end
