class Picture < ApplicationRecord
    belongs_to :album

    validates :image_url, :album_id, presence: true
end
