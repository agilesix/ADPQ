class CreateKnowledgeArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :knowledge_articles do |t|
      t.string :title
      t.text :body
      t.belongs_to :user, foreign_key: true
      t.boolean :published, nil: false, default: false
      t.timestamps
    end

    create_table :workflow_step_knowledge_articles do |t|
      t.references :workflow_step
      t.references :knowledge_article
    end

    add_index(:workflow_step_knowledge_articles, [ :workflow_step_id, :knowledge_article_id ], name: 'index_on_wfs_ka_id')

  end
end
