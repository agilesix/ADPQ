class WorkflowPackagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow_package, only: [:show, :edit, :update, :destroy]

  # GET /workflow_packages
  # GET /workflow_packages.json
  def index
    @workflow_packages = current_user.workflow_packages.where(workflow_id: params[:workflow_id])
  end

  # GET /workflow_packages/1
  # GET /workflow_packages/1.json
  def show
  end

  # GET /workflow_packages/new
  def new
    @workflow_package = WorkflowPackage.new
  end

  # GET /workflow_packages/1/edit
  def edit
  end

  # POST /workflow_packages
  # POST /workflow_packages.json
  def create
    @workflow_package = WorkflowPackage.new(workflow_package_params)

    respond_to do |format|
      if @workflow_package.save
        format.html { redirect_to @workflow_package, notice: 'Workflow package was successfully created.' }
        format.json { render :show, status: :created, location: @workflow_package }
      else
        format.html { render :new }
        format.json { render json: @workflow_package.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /workflow_packages/1
  # PATCH/PUT /workflow_packages/1.json
  def update
    respond_to do |format|
      if @workflow_package.user == current_user && @workflow_package.update(workflow_package_params)
        format.html { redirect_to @workflow_package, notice: 'Workflow package was successfully updated.' }
        format.json { render :show, status: :ok, location: @workflow_package }
      else
        format.html { render :edit }
        format.json { render json: @workflow_package.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /workflow_packages/1
  # DELETE /workflow_packages/1.json
  def destroy
    @workflow_package.destroy if @workflow_package.user == current_user
    respond_to do |format|
      format.html { redirect_to workflow_packages_url, notice: 'Workflow package was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workflow_package
      @workflow_package = WorkflowPackage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def workflow_package_params
      params.require(:workflow_package).permit(:workflow_id, :name, :description, :user_id)
    end
end
