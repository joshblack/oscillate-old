defmodule Oscillate.ErrorView do
  use Oscillate.Web, :view

  @spec render(String.t, any) :: %{errors: %{detail: String.t}}
  def render("404.json", _assigns) do
    %{errors: %{detail: "Page not found"}}
  end

  @spec render(String.t, any) :: %{errors: %{detail: String.t}}
  def render("500.json", _assigns) do
    %{errors: %{detail: "Internal server error"}}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  @spec template_not_found(any, any) :: %{errors: %{detail: String.t}}
  def template_not_found(_template, assigns) do
    render "500.json", assigns
  end
end
