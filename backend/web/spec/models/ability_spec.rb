require 'rails_helper'

RSpec.describe Ability, type: :model do

  it 'allows user\'s with no role to read everything, but nothing else' do
    user = FactoryBot.create User
    ability = Ability.new(user)
    expect(ability.can? :read, :all).to be true
    expect(ability.can? :manage, :all).to be false
  end

  it 'allows admin to manage everything' do
    user = FactoryBot.create User
    user.add_role 'Admin'
    ability = Ability.new(user)
    expect(ability.can? :manage, :all).to be true
    expect(ability.can? :manage, KnowledgeArticle).to be true
    expect(ability.can? :manage, WorkflowStep).to be true
    # TODO: more to domain models to come
  end

  it 'allows Contributor to manage their own KnowledgeArticle' do
    user = FactoryBot.create User
    # no roles

    article = FactoryBot.create KnowledgeArticle

    ability = Ability.new(user)
    expect(ability.can? :manage, article).to be false

    article.user = user
    ability = Ability.new(user)
    expect(ability.can? :manage, article).to be false

    user.add_role 'Contributor'
    ability = Ability.new(user)
    expect(ability.can? :manage, article).to be true
  end


end
