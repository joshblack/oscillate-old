defmodule Oscillate.Schema.Type do
  @moduledoc """
  Provides access to all the types that we've defined in our Schema for use in
  Queries, Mutations, and Subscriptions.
  """

  use Oscillate.Web, :type

  import_types Oscillate.Schema.Type.Node
  import_types Oscillate.Schema.Type.Viewer
end
