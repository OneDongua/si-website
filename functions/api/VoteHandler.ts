interface Env {
  VOTE: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();
    for (const id of Object.keys(body)) {
      await context.env.VOTE.put(
        id + "+" + Date.now(),
        JSON.stringify(body[id])
      );
    }
    return new Response("Success");
  } else if (context.request.method === "GET") {
    const url = new URL(context.request.url);
    const params = url.searchParams;
    const timestamp = params.get("timestamp");
    const type = params.get("type");

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      if (!type) return new Response("Error: unknown type", { status: 400 });
      if (type === "calc") {
        const list = await context.env.VOTE.list();
        const keys: { name: string }[] = list.keys;
        const data = {};
        for (const key of keys) {
          if (/^\d+\+\d+$/.test(key.name)) {
            const id = key.name.split("+")[0];
            const items: number[] = await context.env.VOTE.get(key.name, {
              type: "json",
            });
            for (const item of items) {
              if (!data[id]) data[id] = {};
              if (!data[id][item]) data[id][item] = 0;
              data[id][item] += 1;
            }
          }
        }
        return new Response(JSON.stringify(data));
      } else if (type === "get") {
        const data = await context.env.VOTE.get("datas", {
          type: "json",
        });
        return new Response(JSON.stringify(data));
      }
    }
  }
  return new Response("Error: unknown error", { status: 400 });
};
