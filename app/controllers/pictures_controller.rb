class PicturesController < ApplicationController

    def index
        all_pictures = Picture.all
        render json: all_pictures, status: :ok
    end

    def create
        new_pic = Picture.create!(picture_params)
        render json: new_pic, status: :created
    end

    private

    def picture_params
        params.permit(:image_url, :album_id)
    end

end
