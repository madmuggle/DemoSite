const SERVICESURI = "http://localhost:8000/api";

export default async function reqSvc(requestObj) {
  const resp = await fetch(SERVICESURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(requestObj),
  });

  if (resp.status !== 200)
    throw new Error(`${resp.status}, "${await resp.text()}"`);

  return await resp.json();
}


