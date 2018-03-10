FactoryBot.define do
  factory :workflow do
    association :workflow_type
    name "Agile Acquisition Workflow"
    package_name 'Solicitation'
    description "Test Workflow Description"
  end
end
