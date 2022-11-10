import Admin from "../middleware/admin";
export default function roleCheck(context, middleware) {
  var returnwert = false;
  for (const role of middleware) {
    if (
      role() == context.store.getters["auth/role"] ||
      context.store.getters["auth/role"] == Admin()
    ) {
      returnwert = true;
    }
  }
  return returnwert;
}
