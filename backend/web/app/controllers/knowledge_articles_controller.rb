class KnowledgeArticlesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_knowledge_article, only: [:show, :edit, :update, :destroy]
  before_action :current_user_is_admin?, only: [:create, :update, :destroy]

  # GET /knowledge_articles
  # GET /knowledge_articles.json
  def index
    @knowledge_articles = KnowledgeArticle.all
  end

  # GET /knowledge_articles/1
  # GET /knowledge_articles/1.json
  def show
  end

  # GET /knowledge_articles/new
  def new
    @knowledge_article = KnowledgeArticle.new
  end

  # GET /knowledge_articles/1/edit
  def edit
  end

  # POST /knowledge_articles
  # POST /knowledge_articles.json
  def create
    @knowledge_article = KnowledgeArticle.new(knowledge_article_params)

    respond_to do |format|
      if @knowledge_article.save
        WorkflowStepKnowledgeArticle.create!(workflow_step_id: params[:knowledge_article][:workflow_step_id], knowledge_article_id: @knowledge_article.id)
        format.html { redirect_to @knowledge_article, notice: 'Knowledge article was successfully created.' }
        format.json { render :show, status: :created, location: @knowledge_article }
      else
        format.html { render :new }
        format.json { render json: @knowledge_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /knowledge_articles/1
  # PATCH/PUT /knowledge_articles/1.json
  def update
    respond_to do |format|
      if @knowledge_article.update(knowledge_article_params)
        format.html { redirect_to @knowledge_article, notice: 'Knowledge article was successfully updated.' }
        format.json { render :show, status: :ok, location: @knowledge_article }
      else
        format.html { render :edit }
        format.json { render json: @knowledge_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /knowledge_articles/1
  # DELETE /knowledge_articles/1.json
  def destroy
    @knowledge_article.destroy
    respond_to do |format|
      format.html { redirect_to knowledge_articles_url, notice: 'Knowledge article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_knowledge_article
      @knowledge_article = KnowledgeArticle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def knowledge_article_params
      params.require(:knowledge_article).permit(:title, :body, :user_id, :published, :workflow_step_id)
    end
end
