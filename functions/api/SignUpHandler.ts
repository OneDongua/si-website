interface Env {
  PART_LIST: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    let body = await context.request.json();

    if (!body) {
      return new Response("Error: no request body.", { status: 400 });
    }

    await context.env.PART_LIST.put(
      body.timestamp.toString(),
      JSON.stringify(body.data)
    );
    return new Response("Success");
  } else if (context.request.method === "GET") {
    const url = new URL(context.request.url);
    const params = url.searchParams;
    const timestamp = params.get("timestamp");

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      const data = await context.env.PART_LIST.list();
      return new Response(data.keys);
    }
  }
  return new Response("Error: unknown error", { status: 400 });
};
