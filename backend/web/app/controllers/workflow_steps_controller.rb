class WorkflowStepsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow_step, only: [:show, :edit, :update, :destroy]

  # GET /workflow_steps
  # GET /workflow_steps.json
  def index
    @workflow_steps = WorkflowStep.all
  end

  # GET /workflow_steps/1
  # GET /workflow_steps/1.json
  def show
  end

  # GET /workflow_steps/new
  def new
    @workflow_step = WorkflowStep.new
  end

  # GET /workflow_steps/1/edit
  def edit
  end

  # POST /workflow_steps
  # POST /workflow_steps.json
  def create
    @workflow_step = WorkflowStep.new(workflow_step_params)

    respond_to do |format|
      if @workflow_step.save
        format.html { redirect_to @workflow_step, notice: 'Workflow step was successfully created.' }
        format.json { render :show, status: :created, location: @workflow_step }
      else
        format.html { render :new }
        format.json { render json: @workflow_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /workflow_steps/1
  # PATCH/PUT /workflow_steps/1.json
  def update
    respond_to do |format|
      if @workflow_step.update(workflow_step_params)
        format.html { redirect_to @workflow_step, notice: 'Workflow step was successfully updated.' }
        format.json { render :show, status: :ok, location: @workflow_step }
      else
        format.html { render :edit }
        format.json { render json: @workflow_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /workflow_steps/1
  # DELETE /workflow_steps/1.json
  def destroy
    @workflow_step.destroy
    respond_to do |format|
      format.html { redirect_to workflow_steps_url, notice: 'Workflow step was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workflow_step
      @workflow_step = WorkflowStep.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def workflow_step_params
      params.require(:workflow_step).permit(:workflow_id, :name, :description, :string)
    end
end
