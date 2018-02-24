require 'rails_helper'

RSpec.describe "ContentBlocks", type: :request do
  describe "GET /content_blocks" do
    it "works! (now write some real specs)" do
      get content_blocks_path
      expect(response).to have_http_status(200)
    end
  end
end
