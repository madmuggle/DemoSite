const SERVICESURI = "http://localhost:8000/api";


async function reqSvc(requestObj) {
  const resp = await fetch(SERVICESURI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: ensureJson(requestObj),
  });

  if (resp.status !== 200)
    throw new Error(`${resp.status}, "${await resp.text()}"`);

  return await resp.json();
}


function ensureJson(objOrJson) {
  if (typeof objOrJson !== "string")
    return JSON.stringify(objOrJson);
  else
    return objOrJson;
}

export default reqSvc;

