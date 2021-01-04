class Todo < ApplicationRecord
  validates_presence_of :title
  validates_presence_of :start
  validates_presence_of :end
  validates_presence_of :color

  belongs_to :user

  has_many :todo_tag_maps
  has_many :tags, through: :todo_tag_maps

end
