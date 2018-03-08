FactoryBot.define do
  factory :workflow_step_package do
    association :workflow_package
    association :workflow_step
    association :user
  end
end
