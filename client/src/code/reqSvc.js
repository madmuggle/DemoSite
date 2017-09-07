const SERVICESURI = "http://localhost:8000/api";

export default async function reqSvc(requestJson) {
  const resp = await fetch(SERVICESURI, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });

  // Use resp.text() then JSON.parse, for better debug info.
  // resp.json() works, too.
  const respText = await resp.text();

  console.log("Request:\n", requestJson);
  console.log("Response:\n", resp);
  console.log("Response content:\n", respText);

  if (resp.status !== 200)
    throw new Error("Api response status: " + resp.status);

  return JSON.parse(respText);
}


//reqSvc({
//  action: "CreateUser",
//  data: {
//    fullname: "James Potter",
//    age: 30
//  },
//})
//.then(x => console.log("CreateUser result:", x))
//.catch(console.error);

