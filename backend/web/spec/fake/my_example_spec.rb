require 'rails_helper'

describe 'My behaviour' do

  it 'should do something' do
    expect(true).to eq(true)
  end

  it 'should test the ui and scan for accessibility issues' do
    visit '/'
    expect(page).to have_content('We are using: Languages: Ruby Javascript YAML HTML5 CSS3/SASS English Web Frameworks: Rails Database: Postgres Redis DevOps: Puma nginx Docker CircleCi AWS ELB Testing: Rspec Capybara Sniffybara Selenium Other libraries include (but are not limited to): USWDS JQuery Bootstrap Sidekiq Devise test')
  end

end