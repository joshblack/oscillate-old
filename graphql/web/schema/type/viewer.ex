defmodule Oscillate.Schema.Type.Viewer do
  @moduledoc """
  Provides a Root Viewer Type for use in a GraphQL Schema. This is helpful when
  working with Relay-specific clients since fragments will be based off of this
  Viewer Type.
  """

  # alias Oscillate.Resolver.Team
  alias Oscillate.UserResolver

  use Oscillate.Web, :type

  object :viewer do
    field :info, type: :user do
      resolve &UserResolver.whoami/2
    end
  end
end
