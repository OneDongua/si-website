interface Env {
  USERS: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

    if (!body) {
      return new Response("Error: no request body.", { status: 400 });
    }

    await context.env.USERS.put(body.email, JSON.stringify(body.password));

    return new Response("Success");
  }
  return new Response("Error: unknown error", { status: 400 });
};
