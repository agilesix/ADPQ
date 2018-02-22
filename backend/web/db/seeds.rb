# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Create Roles
Role.create!(name: 'Admin') unless Role.exists? name: 'Admin'

#Create Users
User.create!(email: 'dan@a2tool.com', nickname: 'Dan', name: 'Dan', password: "dana2tool") unless User.find_by(email: 'dan@a2tool.com').present?
User.create!(email: 'bob@a2tool.com', nickname: 'Bob', name: 'Bob', password: "boba2tool") unless User.find_by(email: 'bob@a2tool.com').present?
User.create!(email: 'tanya@a2tool.com', nickname: 'Tanya', name: 'Tanya', password: "tanyaa2tool") unless User.find_by(email: 'tanya@a2tool.com').present?
admin = User.create!(email: 'admin@a2tool.com', nickname: 'Admin', name: 'Admin', password: "admina2tool") unless User.find_by(email: 'admin@a2tool.com').present?

#Assign Roles to Users
admin.add_role 'Admin' unless admin.has_role? 'Admin'
