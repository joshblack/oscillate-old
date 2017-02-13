defmodule Oscillate.User do
  use Oscillate.Web, :model

  schema "users" do
    field :name, :string
    field :bio, :string
    field :avatar_url, :string
    field :email, :string
    field :location, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :bio, :email, :avatar_url, :location])
    |> validate_required([:name, :email])
    |> unique_constraint(:email)
  end
end
