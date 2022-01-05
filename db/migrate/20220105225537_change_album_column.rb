class ChangeAlbumColumn < ActiveRecord::Migration[6.1]
  def change
    change_column(:albums, :time, :date)    
  end
end
