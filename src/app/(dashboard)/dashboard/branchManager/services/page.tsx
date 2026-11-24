"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { BRANCHES } from "@/lib/branches";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Service = {
  _id?: string;
  name?: string;
  serviceName?: string;
  title?: string;
  description?: string;
  price?: number | string;
  duration?: number | string;
  branchManagerId?: string;
  branchManagerEmail?: string;
  createdBy?: string;
  ownerEmail?: string;
  branchName?: string;
  branch?: string;
  image?: string;
  included?: string[] | string;
};

const API_URL =
  process.env.NEXT_PUBLIC_CAR_WASH_API_URL ?? "http://localhost:5000";

export default function BranchManagerServicesPage() {
  const { data: session, isPending } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const managerId = session?.user?.id;
  const managerEmail = session?.user?.email;
  const managerBranch = (session?.user as { branch?: string } | undefined)
    ?.branch;

  const loadServices = useCallback(async () => {
    if (!managerId && !managerEmail) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/services`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Unable to load services");
      }

      const data = (await response.json()) as Service[];
      const ownedServices = data.filter((service) => {
        const owners = [
          service.branchManagerId,
          service.branchManagerEmail,
          service.createdBy,
          service.ownerEmail,
        ];

        return owners.some(
          (owner) =>
            owner === managerId ||
            (managerEmail &&
              owner?.toLowerCase() === managerEmail.toLowerCase()),
        );
      });

      setServices(ownedServices);
    } catch (error) {
      toast.add({
        title: "Could not load services",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [managerEmail, managerId]);

  useEffect(() => {
    if (!isPending) {
      void loadServices();
    }
  }, [isPending, loadServices]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!managerId && !managerEmail) return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const price = Number(formData.get("price"));
    const duration = String(formData.get("duration") ?? "").trim();
    const branchName = String(formData.get("branchName") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const included = String(formData.get("included") ?? "")
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !name ||
      !description ||
      !branchName ||
      !Number.isFinite(price) ||
      price < 0 ||
      !duration
    ) {
      toast.add({
        title: "Invalid service",
        description: "Complete all fields, including branch name.",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          duration,
          branchManagerId: managerId,
          branchManagerEmail: managerEmail,
          createdBy: managerId,
          ownerEmail: managerEmail,
          branchName,
          branch: branchName,
          image: image || undefined,
          included,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create service");
      }

      toast.add({
        title: "Service created",
        description: `${name} was added successfully.`,
        type: "success",
      });
      event.currentTarget.reset();
      setIsOpen(false);
      await loadServices();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceName = (service: Service) =>
    service.name ?? service.serviceName ?? service.title ?? "Unnamed service";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-blue-400">
            My Services
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the services you offer at your branch.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button type="button" className="gap-2" />}>
            <Plus aria-hidden="true" />
            Add Services
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add a service</DialogTitle>
              <DialogDescription>
                Enter the details customers will see for this service.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="service-name" className="text-sm font-medium">
                  Service name
                </label>
                <Input
                  id="service-name"
                  name="name"
                  placeholder="Exterior wash"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="branchName" className="text-sm font-medium">
                  Branch name
                </label>
                <select
                  id="branchName"
                  name="branchName"
                  defaultValue={managerBranch ?? ""}
                  required
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="" disabled>
                    Select a branch
                  </option>
                  {BRANCHES.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="service-image" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="service-image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/service-image.jpg"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="service-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="service-description"
                  name="description"
                  placeholder="Describe what is included"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="service-included" className="text-sm font-medium">
                  What&apos;s included
                </label>
                <Textarea
                  id="service-included"
                  name="included"
                  placeholder={"Enter one item per line\nExterior hand wash\nTire cleaning"}
                />
                <p className="text-xs text-muted-foreground">
                  Separate items with a new line or comma.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="service-price"
                    className="text-sm font-medium"
                  >
                    Price
                  </label>
                  <Input
                    id="service-price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="25.00"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="service-duration"
                    className="text-sm font-medium"
                  >
                    Duration
                  </label>
                  <Input
                    id="service-duration"
                    name="duration"
                    placeholder="30 minutes"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create service"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-medium">Your services</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => void loadServices()}
            disabled={isLoading}
          >
            <RefreshCw
              aria-hidden="true"
              className={isLoading ? "animate-spin" : ""}
            />
            Refresh
          </Button>
        </div>

        {isPending || isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading services...
          </div>
        ) : (
          <Table>
            <TableCaption>
              {services.length
                ? `${services.length} service${services.length === 1 ? "" : "s"}`
                : "No services created yet."}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Service</TableHead>
                <TableHead className="font-bold">Branch</TableHead>
                <TableHead className="font-bold">Description</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Duration</TableHead>
                {/* <Button>Edit</Button> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length ? (
                services.map((service) => (
                  <TableRow key={service._id ?? getServiceName(service)}>
                    <TableCell className="font-medium">
                      {getServiceName(service)}
                    </TableCell>
                    <TableCell>
                      {service.branchName ?? service.branch ?? "-"}
                    </TableCell>
                    <TableCell className="max-w-md whitespace-normal">
                      {service.description ?? "-"}
                    </TableCell>
                    <TableCell>
                      {service.price !== undefined
                        ? `$${Number(service.price).toFixed(2)}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {service.duration !== undefined
                        ? String(service.duration)
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No services found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
