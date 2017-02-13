defmodule Oscillate.Schema do
  @moduledoc """
  The GraphQL Schema for Heart that imports all the Types, Fields, and Mutations
  and imports the specific fields from each for our Root Query Type and Root
  Mutation Type.
  """

  use Absinthe.Schema
  use Absinthe.Relay.Schema

  import_types Oscillate.Schema.Type
  import_types Oscillate.Schema.Field
  import_types Oscillate.Schema.Mutation
  import_types Oscillate.Schema.Subscription

  query do
    import_fields :node_field
    import_fields :viewer_field
  end

  # mutation do
  # end

  # subscription do
  # end
end
