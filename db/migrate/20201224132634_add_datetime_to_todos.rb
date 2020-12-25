class AddDatetimeToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :start, :datetime
    add_column :todos, :end, :datetime
  end
end
