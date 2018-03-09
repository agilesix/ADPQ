FactoryBot.define do
  factory :package_file_attachment do
    association :workflow_step_package
    association :user
    attached_file File.new("#{Rails.root}/spec/documents/test.pdf")
  end
end
