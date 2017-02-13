defmodule Oscillate.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :bio, :string
      add :avatar_url, :string
      add :email, :string
      add :location, :string

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
