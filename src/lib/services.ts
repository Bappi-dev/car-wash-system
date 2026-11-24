export type Service = {
  _id?: string;
  id?: string;
  name?: string;
  serviceName?: string;
  title?: string;
  description?: string;
  price?: number | string;
  duration?: number | string;
  image?: string;
  imageUrl?: string;
  branchName?: string;
  branch?: string;
  included?: string[] | string;
};

const API_URL =
  process.env.NEXT_PUBLIC_CAR_WASH_API_URL ?? "http://localhost:5000";

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load services. Please try again.");
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("The services response has an unexpected format.");
  }

  return data as Service[];
}

export function getServiceId(service: Service) {
  return service._id ?? service.id;
}

export function getServiceName(service: Service) {
  return service.name ?? service.serviceName ?? service.title ?? "Unnamed service";
}

export function getServiceImage(service: Service) {
  return service.image ?? service.imageUrl;
}

export function getServiceIncluded(service: Service) {
  const included = service.included;
  const items = Array.isArray(included) ? included : included?.split(/[\n,]/);

  return items
    ?.filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];
}

export function formatServicePrice(price: Service["price"]) {
  if (price === undefined || price === null || price === "") {
    return "Price unavailable";
  }

  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `৳${numericPrice.toLocaleString()}`
    : String(price);
}
