interface Env {
  PART_LIST: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    let body = await context.request.json();

    if (!body) {
      return new Response("Error", { status: 400 });
    }

    await context.env.PART_LIST.put(
      body.timestamp.toString(),
      JSON.stringify(body.data)
    );
    return new Response("Success");
  }
  return new Response("Hello World!");
};