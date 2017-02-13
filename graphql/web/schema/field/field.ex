defmodule Oscillate.Schema.Field do
  @moduledoc """
  Provides access to all the Fields that we've defined for our Root Query Type.
  """

  use Absinthe.Schema.Notation

  import_types Oscillate.Schema.Field.Node
  import_types Oscillate.Schema.Field.Viewer
end
