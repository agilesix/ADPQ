FactoryBot.define do
  factory :workflow_package do
    association :workflow
    name "The Best Workflow Package"
    description "The Best Workflow Package's description."
    association :user
  end
end
