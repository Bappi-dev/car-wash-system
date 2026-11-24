"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchServices,
  formatServicePrice,
  getServiceIncluded,
  getServiceImage,
  getServiceName,
  type Service,
} from "@/lib/services";

export default function ServiceDetails({ serviceId }: { serviceId: string }) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadService = async () => {
      try {
        const services = await fetchServices();
        const foundService = services.find(
          (item) => item._id === serviceId || item.id === serviceId,
        );

        if (isActive) {
          setService(foundService ?? null);
          setError("");
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load service details. Please try again.",
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadService();
    return () => {
      isActive = false;
    };
  }, [serviceId]);

  const image = service ? getServiceImage(service) : undefined;
  const includedItems = service ? getServiceIncluded(service) : [];

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Button
          variant="ghost"
          className="mb-6"
          render={<Link href="/services" />}
        >
          <ArrowLeft aria-hidden="true" />
          All services
        </Button>

        {isLoading ? (
          <Card className="overflow-hidden p-0 md:grid md:grid-cols-2">
            <Skeleton className="h-72 rounded-none md:h-full" />
            <div className="space-y-4 p-6 md:p-10">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </Card>
        ) : error ? (
          <Card className="items-center p-8 text-center">
            <CardTitle>Could not load service</CardTitle>
            <CardDescription>{error}</CardDescription>
          </Card>
        ) : service ? (
          <Card className="overflow-hidden p-0 md:grid md:grid-cols-2">
            <div className="relative flex min-h-72 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700 text-amber-300 md:min-h-full">
              <Droplets aria-hidden="true" className="size-16" />
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
            <div className="flex flex-col justify-center p-6 md:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl text-[#192f62]">
                  {getServiceName(service)}
                </CardTitle>
                <CardDescription>
                  {service.branchName ??
                    service.branch ??
                    "Available at all branches"}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6 space-y-6 p-0">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {service.description || "No description is available yet."}
                </p>
                <div className="grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Price
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#192f62]">
                      {formatServicePrice(service.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Duration
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#192f62]">
                      {service.duration ?? "Not specified"}
                    </p>
                  </div>
                </div>
                {includedItems.length > 0 ? (
                  <section aria-labelledby="service-included-title">
                    <h2
                      id="service-included-title"
                      className="text-sm font-semibold text-slate-900"
                    >
                      What&apos;s included
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {includedItems.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                <Button
                  size="lg"
                  className="w-full bg-[#192f62] text-white hover:bg-[#263e7c]"
                  render={<Link href="/booking" />}
                >
                  Book Now
                </Button>
              </CardContent>
            </div>
          </Card>
        ) : (
          <Card className="items-center p-8 text-center">
            <CardTitle>Service not found</CardTitle>
            <CardDescription>
              This service may have been removed or its link may be incorrect.
            </CardDescription>
            <Button render={<Link href="/services" />}>Browse services</Button>
          </Card>
        )}
      </div>
    </main>
  );
}
