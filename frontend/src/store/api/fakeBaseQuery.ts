import type { BaseQueryFn } from "@reduxjs/toolkit/query";

type FakeArgs = {
  url: string;
  method?: "GET" | "POST";
  body?: any;
};

export const fakeBaseQuery =
  (): BaseQueryFn<FakeArgs, unknown, unknown> =>
  async ({ url, method = "GET", body }) => {
    await new Promise((res) => setTimeout(res, 400));

    if (url === "/login" && method === "POST") {
      const user = {
        id: "1",
        name: body.email.split("@")[0],
        email: body.email,
      };

      localStorage.setItem("user", JSON.stringify(user));

      return { data: { token: "fake-token", user } };
    }

    if (url === "/tickets" && method === "GET") {
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      return { data: tickets };
    }

    if (url === "/tickets" && method === "POST") {
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

      const newTicket = {
        id: crypto.randomUUID(),
        ...body,
        createdAt: new Date().toISOString(),
      };

      tickets.push(newTicket);
      localStorage.setItem("tickets", JSON.stringify(tickets));

      return { data: newTicket };
    }

    return {
      error: { status: 404, data: "Not found" },
    };
  };
