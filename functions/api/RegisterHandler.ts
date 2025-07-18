interface Env {
  USERS: KVNamespace;
  CODE: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

    if (!body) {
      return new Response(JSON.stringify({ msg: "Error: no request body." }), { status: 400 });
    }

    if (await context.env.USERS.get(body.email)) {
      return new Response(JSON.stringify({ msg: "Error: user already exists." }), { status: 400 });
    }

    if (body.code !== (await context.env.CODE.get(0)))
      return new Response(JSON.stringify({ msg: "Error: wrong code." }), { status: 400 });

    await context.env.USERS.put(body.email, body.password);
    return new Response(JSON.stringify({ msg: "Success" }));
  }
  return new Response(JSON.stringify({ msg: "Error: unknown error" }), { status: 400 });
};
