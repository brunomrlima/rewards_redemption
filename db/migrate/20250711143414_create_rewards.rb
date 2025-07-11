class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :title, null: false
      t.text :description
      t.integer :cost, null: false

      t.timestamps
    end
  end
end
