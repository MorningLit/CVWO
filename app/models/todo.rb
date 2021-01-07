class Todo < ApplicationRecord
  validates_presence_of :title
  validates_presence_of :start
  validates_presence_of :end
  validates_presence_of :color

  belongs_to :user
end
