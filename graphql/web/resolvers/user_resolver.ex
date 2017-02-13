defmodule Oscillate.UserResolver do
  @doc """
  `whoami` matches on two patterns, the first one for matching on when we have
  `user` available on the context object. This means that Guardian correctly
  decoded the incoming Authorization Bearer token and found the currently
  signed-in user.
  """
  def whoami(_args, %{context: %{user: user}}) do
    {:ok, user}
  end

  @doc """
  This second `whoami` pattern matches against all the other cases, providing us
  with a default value of `nil`.
  """
  def whoami(_args, _info) do
    {:ok, nil}
  end
end
