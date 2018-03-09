class WorkflowStepPackagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow_step_package, only: [:show, :edit, :update, :destroy]

  # GET /workflow_step_packages
  # GET /workflow_step_packages.json
  def index
    @workflow_step_packages = current_user.workflow_step_packages.where(workflow_package_id: params[:workflow_package_id])
  end

  # GET /workflow_step_packages/1
  # GET /workflow_step_packages/1.json
  def show
  end

  # GET /workflow_step_packages/new
  def new
    @workflow_step_package = WorkflowStepPackage.new
  end

  # GET /workflow_step_packages/1/edit
  def edit
  end

  # POST /workflow_step_packages
  # POST /workflow_step_packages.json
  def create
    @workflow_step_package = WorkflowStepPackage.new(workflow_step_package_params)

    respond_to do |format|
      if @workflow_step_package.save
        format.html { redirect_to @workflow_step_package, notice: 'Workflow step package was successfully created.' }
        format.json { render :show, status: :created, location: @workflow_step_package }
      else
        format.html { render :new }
        format.json { render json: @workflow_step_package.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /workflow_step_packages/1
  # PATCH/PUT /workflow_step_packages/1.json
  def update
    respond_to do |format|
      if @workflow_step_package.user == current_user && @workflow_step_package.update(workflow_step_package_params)
        format.html { redirect_to @workflow_step_package, notice: 'Workflow step package was successfully updated.' }
        format.json { render :show, status: :ok, location: @workflow_step_package }
      else
        format.html { render :edit }
        format.json { render json: @workflow_step_package.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /workflow_step_packages/1
  # DELETE /workflow_step_packages/1.json
  def destroy
    @workflow_step_package.destroy if @workflow_step_package.user == current_user
    respond_to do |format|
      format.html { redirect_to workflow_step_packages_url, notice: 'Workflow step package was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workflow_step_package
      @workflow_step_package = WorkflowStepPackage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def workflow_step_package_params
      params.require(:workflow_step_package).permit(:workflow_package_id, :workflow_step_id, :user_id)
    end
end
