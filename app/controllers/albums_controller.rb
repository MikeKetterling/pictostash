class AlbumsController < ApplicationController

    def index
        all_albums = Album.all
        render json: all_albums, status: :ok
    end

    def create
        new_album = @current_user.albums.create!(album_params)
        render json: new_album, status: :created
    end

    private

    def album_params
        params.permit(:name, :description, :location, :time)
    end
end
