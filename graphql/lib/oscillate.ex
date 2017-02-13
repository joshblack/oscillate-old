defmodule Oscillate do
  @moduledoc """
  Entry-point to our application.
  """

  alias Oscillate.Endpoint

  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  @spec start(any, any) :: any
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Oscillate.Repo, []),
      # Start the endpoint when the application starts
      supervisor(Oscillate.Endpoint, []),
      # Start your own worker by calling:
      #   Oscillate.Worker.start_link(arg1, arg2, arg3)
      # worker(Oscillate.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Oscillate.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @spec config_change(any, any, any) :: atom
  def config_change(changed, _new, removed) do
    Endpoint.config_change(changed, removed)
    :ok
  end
end
