class UserSerializer < ActiveModel::Serializer
  attributes :id, :password_digest, :email, :username
end
