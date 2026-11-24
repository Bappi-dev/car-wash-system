"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Droplets, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchServices,
  formatServicePrice,
  getServiceId,
  getServiceImage,
  getServiceName,
  type Service,
} from "@/lib/services";

function ServiceImage({ service }: { service: Service }) {
  const image = getServiceImage(service);

  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 to-blue-700 text-amber-300">
      <Droplets aria-hidden="true" className="size-12" />
      {image ? (
        // Service images can be hosted on customer-configured domains.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={getServiceName(service)}
          className="absolute inset-0 size-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}

export default function ServicesCatalog() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadServices = async () => {
      try {
        const data = await fetchServices();
        if (isActive) {
          setServices(data);
          setError("");
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load services. Please try again.",
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadServices();
    return () => {
      isActive = false;
    };
  }, [refreshVersion]);

  const refreshServices = () => {
    setIsLoading(true);
    setRefreshVersion((version) => version + 1);
  };

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return services;

    return services.filter((service) =>
      [
        getServiceName(service),
        service.description,
        service.branchName ?? service.branch,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [search, services]);

  return (
    <main className="min-h-[65vh] bg-slate-50">
      {/* <section className="bg-[#192f62] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Car care, made simple
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Explore available washes and detailing services from our branches.
            Find the right service for your car.
          </p>
        </div>
      </section> */}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Available services
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isLoading
                ? "Loading services..."
                : `${filteredServices.length} service${filteredServices.length === 1 ? "" : "s"} found`}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-72">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Search services"
                placeholder="Search services or branches"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                className="h-10 pl-9"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Refresh services"
              onClick={refreshServices}
              disabled={isLoading}
            >
              <RefreshCw
                aria-hidden="true"
                className={isLoading ? "animate-spin" : ""}
              />
            </Button>
          </div>
        </div>

        {error ? (
          <Card className="items-center p-8 text-center">
            <CardTitle>Could not load services</CardTitle>
            <CardDescription>{error}</CardDescription>
            <Button
              type="button"
              variant="outline"
              onClick={refreshServices}
            >
              Try again
            </Button>
          </Card>
        ) : isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <Card key={index} className="overflow-hidden py-0">
                <Skeleton className="h-48 rounded-none" />
                <div className="space-y-3 p-6">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredServices.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => {
              const serviceId = getServiceId(service);
              const serviceName = getServiceName(service);

              return (
                <Card
                  key={serviceId ?? `${serviceName}-${index}`}
                  className="overflow-hidden py-0 transition-shadow hover:shadow-lg"
                >
                  <ServiceImage service={service} />
                  <CardHeader className="pt-6">
                    <CardTitle className="text-lg">{serviceName}</CardTitle>
                    <CardDescription>
                      {service.branchName ?? service.branch ?? "All branches"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {service.description || "Service details coming soon."}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between border-t py-4">
                    <span className="font-semibold text-[#192f62]">
                      {formatServicePrice(service.price)}
                    </span>
                    {serviceId ? (
                      <Button
                        size="sm"
                        render={
                          <Link href={`/services/${encodeURIComponent(serviceId)}`} />
                        }
                      >
                        Details
                        <ArrowRight aria-hidden="true" />
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Details unavailable
                      </span>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="items-center p-8 text-center">
            <CardTitle>
              {services.length ? "No matching services" : "No services yet"}
            </CardTitle>
            <CardDescription>
              {services.length
                ? "Try another search term."
                : "Please check back soon for available services."}
            </CardDescription>
          </Card>
        )}
      </section>
    </main>
  );
}
