require 'rails_helper'

RSpec.describe "content_blocks/edit", type: :view do
  before(:each) do
    @content_block = assign(:content_block, ContentBlock.create!(
      :role => nil,
      :content => "MyText",
      :knowledge_article => nil
    ))
  end

  it "renders the edit content_block form" do
    render

    assert_select "form[action=?][method=?]", content_block_path(@content_block), "post" do

      assert_select "input#content_block_role_id[name=?]", "content_block[role_id]"

      assert_select "textarea#content_block_content[name=?]", "content_block[content]"

      assert_select "input#content_block_knowledge_article_id[name=?]", "content_block[knowledge_article_id]"
    end
  end
end
