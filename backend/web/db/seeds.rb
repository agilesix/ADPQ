# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Create Roles
Role.create!(name: 'Admin') unless Role.exists? name: 'Admin'
Role.create!(name: 'Contributor') unless Role.exists? name: 'Contributor'

#Create Users
dan = User.create!(email: 'dan@a2tool.com', nickname: 'Dan', name: 'Dan', password: "dana2tool") unless User.find_by(email: 'dan@a2tool.com').present?
chris = User.create!(email: 'chris@a2tool.com', nickname: 'Chris', name: 'Chris', password: "chrisa2tool") unless User.find_by(email: 'chris@a2tool.com').present?
bob = User.create!(email: 'bob@a2tool.com', nickname: 'Bob', name: 'Bob', password: "boba2tool") unless User.find_by(email: 'bob@a2tool.com').present?
tanya = User.create!(email: 'tanya@a2tool.com', nickname: 'Tanya', name: 'Tanya', password: "tanyaa2tool") unless User.find_by(email: 'tanya@a2tool.com').present?
admin = User.create!(email: 'admin@a2tool.com', nickname: 'Admin', name: 'Admin', password: "admina2tool") unless User.find_by(email: 'admin@a2tool.com').present?

#Assign Roles to Users
admin.add_role 'Admin' unless admin.blank? || admin.has_role?('Admin')
dan.add_role 'Admin' unless dan.blank? || dan.has_role?('Admin')
chris.add_role 'Admin' unless chris.blank? || chris.has_role?('Admin')
bob.add_role 'Admin' unless bob.blank? || bob.has_role?('Contributor')
tanya.add_role 'Admin' unless tanya.blank? || tanya.has_role?('Contributor')

#Create Workflow Type
workflow_type = WorkflowType.create!(name: 'Acquisition Workflow Type', description: 'The workflow to acquire agile.') unless WorkflowType.exists? name: 'Acquisition Workflow Type'

#Create Workflow
workflow = Workflow.create!(workflow_type: workflow_type, name: 'Agile Acquisition Workflow') unless workflow_type.blank? || Workflow.exists?(name: 'Agile Acquisition Workflow')

#Create Workflow Step(s)
vision_statement_description = "A vision statement is a government program’s road map, indicating both what the program wants to become and guiding transformational initiatives by setting a defined direction for the program's future. Vision statements undergo minimal revisions during the life of a program, unlike operational goals and objectives which may be updated from year-to-year. Effective vision statements are clear, concise and usually consist of two to four sentences. Vision statements should provide a high-level description of the program outcomes required to meet the definition of success."
wfs1 = WorkflowStep.create!(workflow: workflow, name: 'Vision Statement', description: vision_statement_description) unless workflow.blank? && WorkflowStep.exists?(name: 'Vision Statement')
wfs2 = WorkflowStep.create!(workflow: workflow, name: 'Statement of Objectives (SOO)', description: 'This is the description for the Statement of Objectives (SOO) workflow step.') unless workflow.blank? || WorkflowStep.exists?(name: 'Statement of Objectives (SOO)')
wfs3 = WorkflowStep.create!(workflow: workflow, name: 'Concept of Operations (ConOps)', description: 'This is the description for the Concept of Operations (ConOps) workflow step.') unless workflow.blank? || WorkflowStep.exists?(name: 'Concept of Operations (ConOps)')
wfs4 = WorkflowStep.create!(workflow: workflow, name: 'Independent Government Cost Estimate (IGCE)', description: 'This is the description for the Independent Government Cost Estimate (IGCE) workflow step.') unless workflow.blank? || WorkflowStep.exists?(name: 'Independent Government Cost Estimate (IGCE)')
wfs5 = WorkflowStep.create!(workflow: workflow, name: 'Proposal Instructions/Evaluation Criteria', description: 'This is the description for the Proposal Instructions/Evaluation Criteria workflow step.') unless workflow.blank? || WorkflowStep.exists?(name: 'Proposal Instructions/Evaluation Criteria')

#Create Knowledge Article(s)
ka1 = KnowledgeArticle.create!(title: 'How to Create a Vision Statement', body: '# This is a header', user: dan, published: true) unless dan.blank? || KnowledgeArticle.exists?(title: 'How to Create a Vision Statement')
wfs_ka1 = WorkflowStepKnowledgeArticle.create!(workflow_step: wfs1, knowledge_article: ka1) unless (wfs1.blank? || ka1.blank?) || WorkflowStepKnowledgeArticle.exists?(workflow_step: wfs1, knowledge_article: ka1)


#Create File Types
ft1 = FileType.create!(name: 'Microsoft Word') unless FileType.exists?(name: 'Microsoft Word')
ft2 = FileType.create!(name: 'Microsoft Excel') unless FileType.exists?(name: 'Microsoft Excel')
ft3 = FileType.create!(name: 'PDF') unless FileType.exists?(name: 'PDF')

#Create Categories
cat1 = Category.create!(name: 'Template') unless Category.exists?(name: 'Template')
cat2 = Category.create!(name: 'Example') unless Category.exists?(name: 'Example')
cat3 = Category.create!(name: 'Knowledge Reference') unless Category.exists?(name: 'Knowledge Reference')

def seed_file(file_name)
  File.new(File.join(Rails.root, "/app/assets/files/seed/#{file_name}"))
end

#Create File Attachments for Knowledge Article

if dan.present? && ka1.present? && ft1.present? && cat1.present? && cat2.present?
  FileAttachment.create!(filename: 'Vision Statement Template', approved: true, user: dan, category: cat1, file_type: ft1, knowledge_article: ka1, attached_file: seed_file('VisionStatementTemplate.docx'))
  FileAttachment.create!(filename: 'Sample Vision Statement', approved: true, user: dan, category: cat2, file_type: ft1, knowledge_article: ka1, attached_file: seed_file('SampleVisionStatement.docx'))
end
