defmodule Oscillate.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Oscillate.Web, :controller
      use Oscillate.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      alias Oscillate.Repo
      import Ecto
      import Ecto.Query

      import Oscillate.Router.Helpers
      import Oscillate.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [
        get_csrf_token: 0,
        get_flash: 2,
        view_module: 1,
      ]

      import Oscillate.Router.Helpers
      import Oscillate.ErrorHelpers
      import Oscillate.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Oscillate.Repo
      import Ecto
      import Ecto.Query
      import Oscillate.Gettext
    end
  end

  def type do
    quote do
      # Provides us with a DSL for defining GraphQL Types
      use Absinthe.Schema.Notation
      use Absinthe.Relay.Schema.Notation

      # Enable helpers for batching associated requests
      use Absinthe.Ecto, repo: Oscillate.Repo
    end
  end

  def resolver do
    quote do
      alias Oscillate.Repo
      import Ecto
      import Ecto.Query
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
