interface Env {
  Vote: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();
    Object.keys(body).map(async (id) => {
      await context.env.Vote.put(id + "+" + Date.now(), JSON.stringify(body[id]));
    })
    return new Response("Success");
  } else if (context.request.method === "GET") {
    const url = new URL(context.request.url);
    const params = url.searchParams;
    const timestamp = params.get("timestamp");
    const type = params.get("type");

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      if (type === "calc") {
        const list = await context.env.Vote.list();
        const keys = list.keys;
        const data = {};
        for (const key of keys) {
          //if ((key as string).split("+")[0])
          data[key.name] = await context.env.Vote.get(key.name, {
            type: "json",
          });
        }
        return new Response(JSON.stringify(data));
      } else if (type === "get") {
        const data = await context.env.Vote.get("datas", {
          type: "json",
        });
        return new Response(JSON.stringify(data));
      }
    }
  }
  return new Response("Error: unknown error", { status: 400 });
};
