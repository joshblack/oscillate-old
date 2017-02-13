defmodule Oscillate.Router do
  @moduledoc false

  use Oscillate.Web, :router

  require Ueberauth

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug Oscillate.Plug.Context
  end

  scope "/auth", Oscillate do
    pipe_through :api

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
  end

  scope "/" do
    pipe_through :graphql

    forward "/graphql", Absinthe.Plug, schema: Oscillate.Schema

    if Mix.env == :dev do
      forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Oscillate.Schema
    end
  end
end
