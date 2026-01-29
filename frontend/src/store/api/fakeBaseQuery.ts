import type { BaseQueryFn } from "@reduxjs/toolkit/query";

type FakeArgs = {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
};

export const fakeBaseQuery =
  (): BaseQueryFn<FakeArgs, unknown, unknown> =>
  async ({ url, method = "GET", body }) => {
    await new Promise((res) => setTimeout(res, 400));

    if (url === "/tickets" && method === "GET") {
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      return { data: tickets };
    }

    if (url.startsWith("/tickets/") && method === "GET") {
      const id = url.replace("/tickets/", "");
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const ticket = tickets.find((t: { id: string }) => t.id === id);
      if (!ticket) return { error: { status: 404, data: "Not found" } };
      return { data: ticket };
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

    if (url.startsWith("/tickets/") && method === "PUT") {
      const id = url.replace("/tickets/", "");
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const index = tickets.findIndex((t: { id: string }) => t.id === id);
      if (index === -1) return { error: { status: 404, data: "Not found" } };

      const updatedTicket = {
        ...tickets[index],
        ...body,
        id,
      };

      tickets[index] = updatedTicket;
      localStorage.setItem("tickets", JSON.stringify(tickets));

      return { data: updatedTicket };
    }

    if (url.startsWith("/tickets/") && method === "DELETE") {
      const id = url.replace("/tickets/", "");
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const nextTickets = tickets.filter((t: { id: string }) => t.id !== id);

      localStorage.setItem("tickets", JSON.stringify(nextTickets));

      return { data: { id } };
    }

    return {
      error: { status: 404, data: "Not found" },
    };
  };
