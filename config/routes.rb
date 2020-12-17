Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  namespace :api do 
    namespace :v1 do 
     resources :todos, only: [:index, :create, :destroy, :update]
    end 
  end 
  root to: 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
