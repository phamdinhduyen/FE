export default function useAuth() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user) {
    return user;
  }
  return null;
}
