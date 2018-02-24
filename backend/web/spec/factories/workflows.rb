FactoryBot.define do
  factory :workflow do
    association :workflow_type
    name "Test Workflow"
    description "Test Workflow Description"
  end
end
