import ServiceDetails from "@/components/services/ServiceDetails";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServiceDetails serviceId={id} />;
}
