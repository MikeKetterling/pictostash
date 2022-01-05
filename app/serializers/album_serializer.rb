class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :description, :location, :time, :user_id, :name
end
