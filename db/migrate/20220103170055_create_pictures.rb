class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.string :image_url
      t.integer :album_id, foreign_key: true

      t.timestamps
    end
  end
end
