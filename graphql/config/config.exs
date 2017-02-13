# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :oscillate,
  ecto_repos: [Oscillate.Repo]

# Configures the endpoint
config :oscillate, Oscillate.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "upI4UnfIhjZFxnnwiMbHxXGyYDESCA1stOLD7DCazvKMMWfnC0rmUsXtLm4/LHCL",
  render_errors: [view: Oscillate.ErrorView, accepts: ~w(json)],
  pubsub: [name: Oscillate.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

config :ueberauth, Ueberauth,
  providers: [
    github: {Ueberauth.Strategy.Github, [default_scope: "user"]},
  ]

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Oscillate",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: "SECRET_KEY",
  serializer: Oscillate.GuardianSerializer

config :absinthe, schema: Oscillate.Schema
