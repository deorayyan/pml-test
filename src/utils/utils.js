import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getCleanHeaders = (rawHeaders) => {
  if (!rawHeaders) return;

  let headers = {
    ...rawHeaders,
    app_id: process.env.NEXT_PUBLIC_APP_ID,
    app_key: process.env.NEXT_PUBLIC_APP_KEY,
  };

  deleteHostHeaders(headers);

  return headers;
};

export const deleteHostHeaders = (headers) => {
  delete headers["host"];
  delete headers["connection"];
  delete headers["x-middleware-invoke"];
  delete headers["x-invoke-path"];
  delete headers["x-invoke-query"];
  delete headers["x-forwarded-host"];
  delete headers["x-forwarded-port"];
  delete headers["x-forwarded-proto"];
  delete headers["x-forwarded-for"];
  delete headers["x-invoke-output"];
};

export function formatNumber(number) {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // Limits decimal places
  }).format(Number(number));
}
