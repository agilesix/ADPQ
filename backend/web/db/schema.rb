# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180225052851) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "content_blocks", force: :cascade do |t|
    t.text     "content"
    t.integer  "knowledge_article_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["knowledge_article_id"], name: "index_content_blocks_on_knowledge_article_id", using: :btree
  end

  create_table "file_attachments", force: :cascade do |t|
    t.boolean  "approved",                   default: false
    t.string   "filename"
    t.integer  "user_id"
    t.integer  "category_id"
    t.integer  "file_type_id"
    t.integer  "knowledge_article_id"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "attached_file_file_name"
    t.string   "attached_file_content_type"
    t.integer  "attached_file_file_size"
    t.datetime "attached_file_updated_at"
    t.index ["category_id"], name: "index_file_attachments_on_category_id", using: :btree
    t.index ["file_type_id"], name: "index_file_attachments_on_file_type_id", using: :btree
    t.index ["knowledge_article_id"], name: "index_file_attachments_on_knowledge_article_id", using: :btree
    t.index ["user_id"], name: "index_file_attachments_on_user_id", using: :btree
  end

  create_table "file_types", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "knowledge_articles", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "user_id"
    t.boolean  "published",   default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "description"
    t.index ["user_id"], name: "index_knowledge_articles_on_user_id", using: :btree
  end

  create_table "role_content_blocks", force: :cascade do |t|
    t.integer "role_id"
    t.integer "content_block_id"
    t.index ["content_block_id"], name: "index_role_content_blocks_on_content_block_id", using: :btree
    t.index ["role_id", "content_block_id"], name: "index_role_content_blocks_on_role_id_and_content_block_id", using: :btree
    t.index ["role_id"], name: "index_role_content_blocks_on_role_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id", using: :btree
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree
    t.index ["user_id"], name: "index_users_roles_on_user_id", using: :btree
  end

  create_table "workflow_step_knowledge_articles", force: :cascade do |t|
    t.integer "workflow_step_id"
    t.integer "knowledge_article_id"
    t.index ["knowledge_article_id"], name: "index_workflow_step_knowledge_articles_on_knowledge_article_id", using: :btree
    t.index ["workflow_step_id", "knowledge_article_id"], name: "index_on_wfs_ka_id", using: :btree
    t.index ["workflow_step_id"], name: "index_workflow_step_knowledge_articles_on_workflow_step_id", using: :btree
  end

  create_table "workflow_steps", force: :cascade do |t|
    t.integer  "workflow_id"
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["workflow_id"], name: "index_workflow_steps_on_workflow_id", using: :btree
  end

  create_table "workflow_types", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "workflows", force: :cascade do |t|
    t.integer  "workflow_type_id"
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["workflow_type_id"], name: "index_workflows_on_workflow_type_id", using: :btree
  end

  add_foreign_key "content_blocks", "knowledge_articles"
  add_foreign_key "file_attachments", "categories"
  add_foreign_key "file_attachments", "file_types"
  add_foreign_key "file_attachments", "knowledge_articles"
  add_foreign_key "file_attachments", "users"
  add_foreign_key "knowledge_articles", "users"
  add_foreign_key "workflow_steps", "workflows"
  add_foreign_key "workflows", "workflow_types"
end
