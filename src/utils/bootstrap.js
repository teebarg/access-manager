import { getUser } from "./auth-client";
import { allAccess } from "./access-client";

async function bootstrapAppData() {
  let accesses = [];
  let data = null;

  try {
    accesses = await allAccess();
    const { data: email } = await getUser();
    data = email;
  } catch (error) {

  }

  if (!data) {
    return { user: null, accesses };
  }
  const user = data.email;

  return {
    user,
    accesses,
  };
}

export { bootstrapAppData };
