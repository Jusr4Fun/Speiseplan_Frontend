import Admin from "../middleware/admin";
export default function roleCheck(context, middleware) {
  for (const role of middleware) {
    if (
      role() == context.store.getters["auth/role"] ||
      context.store.getters["auth/role"] == Admin()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
