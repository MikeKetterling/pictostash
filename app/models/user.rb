class User < ApplicationRecord
    has_secure_password
    has_many :albums
    has_many :pictures, through: :albums

    validates :username, :email, presence: true, uniqueness: true    
end
