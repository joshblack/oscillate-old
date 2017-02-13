defmodule Oscillate.Error do
  @moduledoc """
  Utility module for generating error messages for GraphQL Fields.
  """

  @spec internal_error() :: String.t
  def internal_error() do
    """
    Whoops, something went wrong.
    """
  end

  @spec not_found(type: String.t, id: String.t) :: String.t
  def not_found(type: type, id: id) do
    """
    No resource found of type: `#{type}`, for id: `#{id}`
    """
  end

  @spec not_found(type: String.t, slug: String.t) :: String.t
  def not_found(type: type, slug: slug) do
    """
    No resource found of type: `#{type}`, for slug: `#{slug}`
    """
  end

  @spec format(Ecto.Changeset) :: list(%{
    message: String.t,
    source: String.t,
    detail: String.t,
  })
  def format(changeset) do
    Enum.map(changeset.errors, fn {field, detail} ->
      %{
        message: "Invalid Attribute for field `#{field}`",
        source: field,
        detail: render_detail(detail),
      }
    end)
  end

  def render_detail({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end

  @spec render_detail(String.t) :: String.t
  def render_detail(message) do
    message
  end
end
