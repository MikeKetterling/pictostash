class Album < ApplicationRecord
    belongs_to :user
    has_many :pictures

    validates :description, :location, :date, :name, presence: true 
end
