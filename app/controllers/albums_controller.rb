class AlbumsController < ApplicationController

    def index
        all_albums = Album.all
        render json: all_albums, status: :ok
    end

    def show        
        this_album = Album.find_by(id: params[:id])
        render json: this_album.pictures, status: :ok
    end

    def create
        new_album = @current_user.albums.create!(album_params)
        render json: new_album, status: :created
    end

    def destroy
        del_album = @current_user.albums.find_by(params[:album_id])
        del_album.destroy
        head :no_content
    end


    private

    def album_params
        params.permit(:name, :description, :location, :time)
    end
end
