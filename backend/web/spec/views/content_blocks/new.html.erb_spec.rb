require 'rails_helper'

RSpec.describe "content_blocks/new", type: :view do
  before(:each) do
    assign(:content_block, ContentBlock.new(
      :role => nil,
      :content => "MyText",
      :knowledge_article => nil
    ))
  end

  it "renders new content_block form" do
    render

    assert_select "form[action=?][method=?]", content_blocks_path, "post" do

      assert_select "input#content_block_role_id[name=?]", "content_block[role_id]"

      assert_select "textarea#content_block_content[name=?]", "content_block[content]"

      assert_select "input#content_block_knowledge_article_id[name=?]", "content_block[knowledge_article_id]"
    end
  end
end
