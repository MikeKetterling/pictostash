class PictureSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :album_id
end
