class AddDescriptionToKnowledgeArticle < ActiveRecord::Migration[5.0]
  def change
    add_column :knowledge_articles, :description, :string
  end
end
