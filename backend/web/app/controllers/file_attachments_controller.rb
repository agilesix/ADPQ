class FileAttachmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_file_attachment, only: [:show, :edit, :update, :destroy]

  # GET /file_attachments
  # GET /file_attachments.json
  def index
    @file_attachments = FileAttachment.all
  end

  # GET /file_attachments/1
  # GET /file_attachments/1.json
  def show
  end

  # GET /file_attachments/new
  def new
    @file_attachment = FileAttachment.new
  end

  # GET /file_attachments/1/edit
  def edit
  end

  # POST /file_attachments
  # POST /file_attachments.json
  def create
    @file_attachment = FileAttachment.new(file_attachment_params)

    respond_to do |format|
      if @file_attachment.save
        format.html { redirect_to @file_attachment, notice: 'File attachment was successfully created.' }
        format.json { render :show, status: :created, location: @file_attachment }
      else
        format.html { render :new }
        format.json { render json: @file_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /file_attachments/1
  # PATCH/PUT /file_attachments/1.json
  def update
    respond_to do |format|
      if @file_attachment.update(file_attachment_params)
        format.html { redirect_to @file_attachment, notice: 'File attachment was successfully updated.' }
        format.json { render :show, status: :ok, location: @file_attachment }
      else
        format.html { render :edit }
        format.json { render json: @file_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /file_attachments/1
  # DELETE /file_attachments/1.json
  def destroy
    @file_attachment.destroy
    respond_to do |format|
      format.html { redirect_to file_attachments_url, notice: 'File attachment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_file_attachment
      @file_attachment = FileAttachment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def file_attachment_params
      params.require(:file_attachment).permit(:approved, :filename, :user_id, :category_id, :file_type_id, :attached_file, :knowledge_article_id)
    end
end
