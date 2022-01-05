class ChangeAlbumsTimeToDate < ActiveRecord::Migration[6.1]
  def change
    change_table :albums do |t|
      t.rename :time, :date
    end
  end
end
