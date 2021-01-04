class CreateTodoTagMaps < ActiveRecord::Migration[6.0]
  def change
    create_table :todo_tag_maps do |t|
      t.references :todo, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
