defmodule Oscillate.Router do
  use Oscillate.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Oscillate do
    pipe_through :api
  end

  forward "/graphql", Absinthe.Plug, schema: Oscillate.Schema

  if Mix.env == :dev do
    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Oscillate.Schema
  end
end
