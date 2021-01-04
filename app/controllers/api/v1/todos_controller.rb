class Api::V1::TodosController < ApplicationController
    def index
      @todos = Todo.order("created_at DESC")
      render json: @todos
    end
   
    def create
      user = User.find_by(email: user_params[:email])
        if user
            todoParams = todo_params
            todoParams[:user_id] = user.id
            @todo = Todo.create(todoParams)
            render json: @todo
        else 
            render json: { status: 401 }
        end
    end
  
    def destroy
      @todo = Todo.find(params[:id])
        if @todo.destroy
          head :no_content, status: :ok
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
    end
  
    def update
      @todo = Todo.find(params[:id])
      @todo.update_attributes(todo_params)
      render json: @todo
    end
  
    private
  
    def todo_params
      params.require(:todo).permit(:title, :description, :color, :completed, :start, :end)
    end

    def user_params
      params.require(:user).permit(:email)
    end

  end