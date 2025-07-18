interface Env {
  USERS: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

    if (!body && !body.email) {
      return new Response("Error: no request body.", { status: 400 });
    }

    return new Response(JSON.stringify(await context.env.USERS.get(body.email)));
  }
  return new Response("Error: unknown error", { status: 400 });
};
