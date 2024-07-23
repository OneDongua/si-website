interface Env {
  QA: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

    if (!body) {
      return new Response("Error: no request body.", { status: 400 });
    }

    if (body.timestamp) {
      await context.env.QA.put(body.timestamp, JSON.stringify(body.data));
      return new Response("Success");
    } else if (body.delete) {
      await context.env.QA.delete(body.delete);
      return new Response("Success");
    }

    return new Response("Error: unknown error", { status: 400 });
  } else if (context.request.method === "GET") {
    const url = new URL(context.request.url);
    const params = url.searchParams;
    const timestamp = params.get("timestamp");

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      const list = await context.env.QA.list();
      const keys = list.keys;
      const data = {};
      for (const key of keys) {
        data[key.name] = await context.env.QA.get(key.name, {
          type: "json",
        });
      }
      return new Response(JSON.stringify(data));
    }
  }
  return new Response("Error: unknown error", { status: 400 });
};
