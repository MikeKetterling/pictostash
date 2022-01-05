class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :description, :location, :date, :user_id, :name
end
