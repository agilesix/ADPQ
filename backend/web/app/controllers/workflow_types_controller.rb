class WorkflowTypesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource # for cancancan
  
  before_action :set_workflow_type, only: [:show, :edit, :update, :destroy]
  before_action :current_user_is_admin?, only: [:create, :update, :destroy]

  # GET /workflow_types
  # GET /workflow_types.json
  def index
    @workflow_types = WorkflowType.all
  end

  # GET /workflow_types/1
  # GET /workflow_types/1.json
  def show
  end

  # GET /workflow_types/new
  def new
    @workflow_type = WorkflowType.new
  end

  # GET /workflow_types/1/edit
  def edit
  end

  # POST /workflow_types
  # POST /workflow_types.json
  def create
    @workflow_type = WorkflowType.new(workflow_type_params)

    respond_to do |format|
      if @workflow_type.save
        format.html { redirect_to @workflow_type, notice: 'Workflow type was successfully created.' }
        format.json { render :show, status: :created, location: @workflow_type }
      else
        format.html { render :new }
        format.json { render json: @workflow_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /workflow_types/1
  # PATCH/PUT /workflow_types/1.json
  def update
    respond_to do |format|
      if @workflow_type.update(workflow_type_params)
        format.html { redirect_to @workflow_type, notice: 'Workflow type was successfully updated.' }
        format.json { render :show, status: :ok, location: @workflow_type }
      else
        format.html { render :edit }
        format.json { render json: @workflow_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /workflow_types/1
  # DELETE /workflow_types/1.json
  def destroy
    @workflow_type.destroy
    respond_to do |format|
      format.html { redirect_to workflow_types_url, notice: 'Workflow type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workflow_type
      @workflow_type = WorkflowType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def workflow_type_params
      params.require(:workflow_type).permit(:name, :description)
    end
end
