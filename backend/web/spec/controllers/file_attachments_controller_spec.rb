require 'rails_helper'
require 'rack/test'
# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.
#
# Also compared to earlier versions of this generator, there are no longer any
# expectations of assigns and templates rendered. These features have been
# removed from Rails core in Rails 5, but can be added back in via the
# `rails-controller-testing` gem.

RSpec.describe FileAttachmentsController, type: :controller do

  before :each do
    @user = FactoryBot.create(:user)
    @auth_headers = @user.create_new_auth_token
    request.headers.merge!(@auth_headers)
    @knowledge_article = FactoryBot.create(:knowledge_article, user: @user)
    @category = FactoryBot.create(:category)
    @file_type = FactoryBot.create(:file_type)
  end
  # This should return the minimal set of attributes required to create a valid
  # FileAttachment. As you add validations to FileAttachment, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {approved: false, filename: 'Test', attached_file: Rack::Test::UploadedFile.new("#{Rails.root}/spec/documents/test.pdf"), knowledge_article_id: @knowledge_article.id, user_id: @user.id, category_id: @category.id, file_type_id: @file_type.id}
  }

  let(:invalid_attributes) {
    {filename: nil}
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # FileAttachmentsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "returns a success response" do
      file_attachment = FileAttachment.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      file_attachment = FileAttachment.create! valid_attributes
      get :show, params: {id: file_attachment.to_param}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #new" do
    it "returns a success response" do
      get :new, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      file_attachment = FileAttachment.create! valid_attributes
      get :edit, params: {id: file_attachment.to_param}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new FileAttachment" do
        expect {
          post :create, params: {file_attachment: valid_attributes}, session: valid_session
        }.to change(FileAttachment, :count).by(1)
      end

      it "redirects to the created file_attachment" do
        post :create, params: {file_attachment: valid_attributes}, session: valid_session
        expect(response).to redirect_to(FileAttachment.last)
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: {file_attachment: invalid_attributes}, session: valid_session
        expect(response).to be_success
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        {filename: 'New Test'}
      }

      it "updates the requested file_attachment" do
        file_attachment = FileAttachment.create! valid_attributes
        put :update, params: {id: file_attachment.to_param, file_attachment: new_attributes}, session: valid_session
        file_attachment.reload
      end

      it "redirects to the file_attachment" do
        file_attachment = FileAttachment.create! valid_attributes
        put :update, params: {id: file_attachment.to_param, file_attachment: valid_attributes}, session: valid_session
        expect(response).to redirect_to(file_attachment)
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'edit' template)" do
        file_attachment = FileAttachment.create! valid_attributes
        put :update, params: {id: file_attachment.to_param, file_attachment: invalid_attributes}, session: valid_session
        expect(response).to be_success
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested file_attachment" do
      file_attachment = FileAttachment.create! valid_attributes
      expect {
        delete :destroy, params: {id: file_attachment.to_param}, session: valid_session
      }.to change(FileAttachment, :count).by(-1)
    end

    it "redirects to the file_attachments list" do
      file_attachment = FileAttachment.create! valid_attributes
      delete :destroy, params: {id: file_attachment.to_param}, session: valid_session
      expect(response).to redirect_to(file_attachments_url)
    end
  end

end
