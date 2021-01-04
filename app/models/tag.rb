class Tag < ApplicationRecord
    validates_presence_of :title

    has_many :todo_tag_maps
    has_many :todos, through: :todo_tag_maps

end
