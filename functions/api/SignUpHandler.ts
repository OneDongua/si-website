interface Env {
  PART_LIST: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    const body = await context.request.json();

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
      const keys = await context.env.PART_LIST.list().keys;
      const getValuePromises = keys.map(async (key) => {
        try {
          const value = await context.env.PART_LIST.get(key.name);
          return {
            key: key.name,
            value: JSON.parse(value),
          };
        } catch (error) {
          console.error(`Error parsing JSON for key ${key.name}:`, error);
          return null;
        }
      });

      const values = await Promise.all(getValuePromises);
      // 过滤掉可能因错误而返回的null值
      const validValues = values.filter(Boolean);
      const data = validValues.reduce(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {}
      );

      return new Response(JSON.stringify(data));
    }
  }
  return new Response("Error: unknown error", { status: 400 });
};
