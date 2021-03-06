class FileAttachmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :current_user_is_admin?, only: [:create_multiple]
  before_action :set_file_attachment, only: [:show, :edit, :update, :destroy]

  # GET /file_attachments
  # GET /file_attachments.json
  def index
    @file_attachments = FileAttachment.all

    if params[:approved].present?
      #filter by approved
      @file_attachments = FileAttachment.approved(params[:approved])
    elsif params[:user].present?
      #filter by the current user
      @file_attachments = FileAttachment.where(user: current_user)
    end
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
    if params[:file_contents].present?
      attachment = params[:file_contents]
      file_contents = Paperclip.io_adapters.for("data:#{attachment[:filetype]};base64,#{attachment[:value]}")
      file_contents.original_filename = params[:file_attachment][:filename]
      @file_attachment = FileAttachment.new(approved: false,
                                            filename: params[:file_attachment][:filename],
                                            user_id: current_user.id,
                                            category_id: params[:file_attachment][:category_id],
                                            file_type_id: 1,
                                            attached_file: file_contents,
                                            knowledge_article_id: params[:file_attachment][:knowledge_article_id],
                                            submitted: true)

      respond_to do |format|
        if @file_attachment.save
          format.html { redirect_to @file_attachment, notice: 'File attachment was successfully created.' }
          format.json { render :show, status: :created, location: @file_attachment }
        else
          format.html { render :new }
          format.json { render json: @file_attachment.errors, status: :unprocessable_entity }
        end
      end
    else
      render json: {success: false, message: 'Missing contents to create a file attachment.'}
    end
  end

  # POST /file_attachments/create/multiple
  # POST /file_attachments/create/multiple
  def create_multiple
    errors = []
    params[:_json].each do |attachment|
      file_contents = Paperclip.io_adapters.for("data:#{attachment[:filetype]};base64,#{attachment[:value]}")
      file_contents.original_filename = attachment[:filename]
      new_attachment = FileAttachment.new(approved: true, filename: attachment[:filename], user_id: current_user.id, category_id: 1, file_type_id: 1, attached_file: file_contents, knowledge_article_id: attachment[:knowledge_article_id], submitted: false)
      unless new_attachment.save
        errors << {filename: attachment[:filename], base_message: "#{attachment[:filename]} did not save properly. Please check the logs for details.", messages: new_attachment.errors.full_messages}
      end
    end
    render json: {status: 200, errors: errors}
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
    if current_user.has_role? 'Admin'
      @file_attachment.destroy
    else
      @file_attachment.destroy if @file_attachment.user == current_user
    end
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
    params.require(:file_attachment).permit(:approved, :filename, :user_id, :category_id, :file_type_id, :attached_file, :knowledge_article_id, :file_contents)
  end
end
