export interface IPostQueryConfig {
  params?: object;
  body?: object;
}

export class Query {
  async get<Result = any>(url: string, params: object) {
    const finalUrl = this.compileUrl(url, params);
    const fetchResult = await fetch(finalUrl);
    if (fetchResult.status >= 400) {
      throw new Error(fetchResult.statusText);
    }
    return (await fetchResult.json()) as Result;
  }

  async post<Result = any>(url: string, options: IPostQueryConfig = {}) {
    const finalUrl = this.compileUrl(url, options.params);
    const fetchResult = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: this.bodyToString(options.body),
    });

    if (fetchResult.status >= 400) {
      throw new Error(fetchResult.statusText);
    }

    return (await fetchResult.json()) as Result;
  }

  private compileUrl(url: string, params: object = {}) {
    const queryParams = new URLSearchParams({});
    const filledOptionKeys = Object.keys(params || {}).filter((key) =>
      Boolean(params[key]),
    );
    const hasParams = filledOptionKeys.length > 0;

    filledOptionKeys.forEach((key) => queryParams.set(key, params[key]));

    const finalUrl = `${url}${hasParams ? `?${queryParams.toString()}` : ""}`;

    return finalUrl;
  }

  private bodyToString(body: string | object | null) {
    if (!body) {
      return undefined;
    }

    if (typeof body === "string") {
      return body;
    }

    return JSON.stringify(body);
  }
}
