defmodule Oscillate.Schema.Field.Node do
  @moduledoc """
  Provides a Relay-compliant Node field used for re-fetching an item by it's
  base64-encoded ID.
  """

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  object :node_field do
    node field do
      resolve fn
        _, _ ->
          nil
      end
    end
  end
end
