"use client";

import React, { use } from "react";
import GroupDetailsPage from "@/components/dashboard/SuperAdmin/Groups/GroupDetailsPage";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const Page = ({ params }: PageProps) => {
    const { id } = use(params);

    return <GroupDetailsPage groupId={id} />;
};

export default Page;
