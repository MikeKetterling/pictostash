class PicturesController < ApplicationController
    def index
        pic = Picture.all
        render json: pic
    end
end
