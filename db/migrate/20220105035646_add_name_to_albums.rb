class AddNameToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_column :albums, :name, :string
  end
end
