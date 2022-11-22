import Admin from "../middleware/admin";
export default function roleCheck(store, middleware) {
  var returnwert = false;
  console.log(middleware);
  for (const role of middleware) {
    if (
      role() == store.getters["auth/role"] ||
      store.getters["auth/role"] == Admin()
    ) {
      returnwert = true;
    }
  }
  return returnwert;
}
