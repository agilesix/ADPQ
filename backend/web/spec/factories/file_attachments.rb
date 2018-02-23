FactoryBot.define do
  factory :file_attachment do
    approved false
    filename "Test File"
    association :user
    association :category
    association :file_type
    attached_file File.new("#{Rails.root}/spec/documents/test.pdf")
  end
end
