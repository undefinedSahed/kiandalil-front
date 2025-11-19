"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  deleteProperty,
  featuredHandling,
  fetchApprovedProperties,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface Property {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  userId: {
    name: string;
    email: string;
  };
  quality: {
    propertyType: string;
    bed: string;
    bath: string;
    sqrFt: string;
  };
  IsFeatured: boolean;
  country: string;
  state: string;
  city: string;
  address: string;
  images: string[];
  createdAt: string;
}

export default function PropertiesPage() {
  const { data: approvedProperties, isLoading } = useQuery({
    queryKey: ["approvedProperties"],
    queryFn: fetchApprovedProperties,
    select: (data) => data.data,
  });

  const queryClient = useQueryClient();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteProperty = async (propertyId: string) => {
    const res = await deleteProperty(propertyId);
    if (res.success === true) {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["unApprovedProperties"] });
    } else {
      toast.error("Failed to delete property");
    }
  };

  const featuredMutation = useMutation({
    mutationFn: (propertyId: string) => featuredHandling(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvedProperties"] });
    },
  });

  const handleFeatured = (propertyId: string) => {
    featuredMutation.mutate(propertyId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Total Properties Listings</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Properties ({approvedProperties?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedProperties?.map((property: Property) => (
                <TableRow key={property._id}>
                  <TableCell>
                    <Image
                      src={
                        property.images[0] ||
                        "/placeholder.svg?height=50&width=50"
                      }
                      alt={property.title}
                      width={50}
                      height={50}
                      className="object-cover w-[80px] h-[60px] rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-gray-500">
                        {property.subtitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {property?.quality.propertyType === "singleFamily"
                      ? "Single Family"
                      : property?.quality.propertyType
                      ? "Multi Family"
                      : property?.quality.propertyType === "retail"
                      ? "Retail"
                      : property?.quality.propertyType === "industrial"
                      ? "Industrial"
                      : property?.quality.propertyType === "land"
                      ? "Land"
                      : "Other"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{property?.userId.name}</p>
                      <p className="text-sm text-gray-500">
                        {property?.userId.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>
                        {property.city}, {property.state}
                      </p>
                      <p className="text-sm text-gray-500">
                        {property.country}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {property.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{property.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(property.createdAt)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={property.IsFeatured}
                      className="data-[state=checked]:bg-green-600"
                      onCheckedChange={() => handleFeatured(property._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/property/${property._id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50 px-4 py-1 text-xs"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 px-4 py-1 text-xs"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
