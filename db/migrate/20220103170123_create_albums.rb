class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string :description
      t.string :location
      t.datetime :time
      t.integer :user_id, foreign_key: true

      t.timestamps
    end
  end
end
