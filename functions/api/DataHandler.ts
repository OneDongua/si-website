interface Env {
  DATA: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

    if (!body) {
      return new Response(JSON.stringify({ msg: "Error: no request body" }), {
        status: 400,
      });
    }

    if (body.get) {
      const what = body.get;
      if (what === "economy") {
        return new Response(await context.env.DATA.get("__economy"));
      }
      if (what === "user") {
        return new Response(await context.env.DATA.get(body.email));
      }
    } else {
      if (body.__economy) {
        await context.env.DATA.put(
          context.env.DATA.put("__economy", JSON.stringify(body.__economy))
        );
        return new Response(JSON.stringify({ msg: "Success" }));
      }
    }
  }

  return new Response(JSON.stringify({ msg: "Error: unknown error" }), {
    status: 400,
  });
};
