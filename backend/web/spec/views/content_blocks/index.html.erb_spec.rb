require 'rails_helper'

RSpec.describe "content_blocks/index", type: :view do
  before(:each) do
    assign(:content_blocks, [
      ContentBlock.create!(
        :role => nil,
        :content => "MyText",
        :knowledge_article => nil
      ),
      ContentBlock.create!(
        :role => nil,
        :content => "MyText",
        :knowledge_article => nil
      )
    ])
  end

  it "renders a list of content_blocks" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
