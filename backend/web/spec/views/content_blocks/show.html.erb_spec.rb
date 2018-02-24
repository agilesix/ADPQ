require 'rails_helper'

RSpec.describe "content_blocks/show", type: :view do
  before(:each) do
    @content_block = assign(:content_block, ContentBlock.create!(
      :role => nil,
      :content => "MyText",
      :knowledge_article => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(//)
  end
end
