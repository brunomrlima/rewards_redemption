Rails.application.routes.draw do
  root "root#index"

  namespace :api do
    namespace :v1 do
      resources :rewards, only: :index
    end
  end

  get "*path", to: "root#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
