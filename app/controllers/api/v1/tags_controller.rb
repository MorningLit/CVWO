class Api::V1::TagsController < ApplicationController
    def index
        @tags = Tag.order("created_at DESC")
        render json: @tags
      end

    def create
        
    end
    
    def destroy
       
    end

    private

    def tag_params
        params.require(:tag).permit(:id, :title)
    end

end
