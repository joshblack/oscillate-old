defmodule Oscillate.Schema.Type.User do
  @moduledoc """
  """

  use Oscillate.Web, :type

  object :user do
    field :id, type: non_null(:id)
    field :name, type: non_null(:string)
    field :email, type: non_null(:string)
    field :bio, type: :string
    field :location, type: :string
    field :avatar_url, type: :string

    field :inserted_at, type: non_null(:string)
    field :updated_at, type: non_null(:string)
  end
end

