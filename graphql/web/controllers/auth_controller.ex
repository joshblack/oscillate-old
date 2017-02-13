defmodule Oscillate.AuthController do
  @moduledoc """
  Authentication Controller
  """

  alias Oscillate.Error
  alias Oscillate.User
  alias Guardian.Plug

  use Oscillate.Web, :controller

  plug Ueberauth

  # TODO: capture error message and format accordingly
  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> json(Error.internal_error())
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    user = %{
      name: auth.info.name,
      email: auth.info.email,
      bio: auth.extra.raw_info.user["bio"],
      avatar_url: auth.extra.raw_info.user["avatar_url"],
      location: auth.info.location,
    }

    changeset = User.changeset(%User{}, user)

    case Repo.get_by(User, email: user.email) do
      nil ->
        case Repo.insert(changeset) do
          {:ok, user} ->
            sign_in(conn, user)

          {:error, changeset} ->
            IO.inspect changeset

            # TODO: Add error param
            conn
            |> render("popup.html", token: "abcd")
        end

      user ->
        sign_in(conn, user)
    end
  end

  def sign_in(conn, user) do
    new_conn = Plug.api_sign_in(conn, user)
    jwt = Plug.current_token(new_conn)

    new_conn
    |> render("popup.html", token: jwt)
  end
end
