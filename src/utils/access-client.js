import client from "./api-client";

function create(accessData) {
  return client("customers", {
    method: "POST",
    body: accessData,
  });
}

function read(listItemIds) {
  if (!listItemIds.length) {
    return Promise.resolve({});
  }
  return client(
    `list-item?listItemIds=${encodeURIComponent(listItemIds.join(","))}`
  );
}

function update(listItemId, updates) {
  return client(`list-item/${listItemId}`, {
    method: "PUT",
    body: updates,
  });
}

function allAccess() {
  return client(`customers`);
}

function remove(accessId) {
  return client(`customers/${accessId}`, { method: "DELETE" });
}

export { create, read, remove, allAccess, update };
