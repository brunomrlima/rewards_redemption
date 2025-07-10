Rails.application.routes.draw do
  root "root#index"
  get "*path", to: "root#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  get "up" => "rails/health#show", as: :rails_health_check
end
