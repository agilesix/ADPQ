class PackageFileAttachmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_package_file_attachment, only: [:show, :edit, :update, :destroy]

  # GET /package_file_attachments
  # GET /package_file_attachments.json
  def index
    @package_file_attachments = current_user.package_file_attachments.where(workflow_step_package_id: params[:workflow_step_package_id])
  end

  # GET /package_file_attachments/1
  # GET /package_file_attachments/1.json
  def show
  end

  # GET /package_file_attachments/new
  def new
    @package_file_attachment = PackageFileAttachment.new
  end

  # GET /package_file_attachments/1/edit
  def edit
  end

  # POST /package_file_attachments
  # POST /package_file_attachments.json
  def create
    if params[:file_contents].present?
      attachment = params[:file_contents]
      file_contents = Paperclip.io_adapters.for("data:#{attachment[:filetype]};base64,#{attachment[:value]}")
      file_contents.original_filename = params[:package_file_attachment][:filename]
      @package_file_attachment = PackageFileAttachment.new(user_id: current_user.id,
                                                           filename: params[:package_file_attachment][:filename],
                                                           attached_file: file_contents,
                                                           workflow_step_package_id: params[:package_file_attachment][:workflow_step_package_id]
      )

      respond_to do |format|
        if @package_file_attachment.save
          format.html { redirect_to @package_file_attachment, notice: 'Package file attachment was successfully created.' }
          format.json { render :show, status: :created, location: @package_file_attachment }
        else
          format.html { render :new }
          format.json { render json: @package_file_attachment.errors, status: :unprocessable_entity }
        end
      end
    else
      render json: {success: false, message: 'Missing contents to create a file attachment.'}
    end
  end

  # PATCH/PUT /package_file_attachments/1
  # PATCH/PUT /package_file_attachments/1.json
  def update
    respond_to do |format|
      if @package_file_attachment.user == current_user && @package_file_attachment.update(package_file_attachment_params)
        format.html { redirect_to @package_file_attachment, notice: 'Package file attachment was successfully updated.' }
        format.json { render :show, status: :ok, location: @package_file_attachment }
      else
        format.html { render :edit }
        format.json { render json: @package_file_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /package_file_attachments/1
  # DELETE /package_file_attachments/1.json
  def destroy
    @package_file_attachment.destroy if @package_file_attachment.user == current_user
    respond_to do |format|
      format.html { redirect_to package_file_attachments_url, notice: 'Package file attachment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_package_file_attachment
    @package_file_attachment = PackageFileAttachment.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def package_file_attachment_params
    params.require(:package_file_attachment).permit(:workflow_step_package_id, :user_id, :attached_file, :filename)
  end
end
