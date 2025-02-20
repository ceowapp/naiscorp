"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/spinner";

const BlogLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      {children}
    </div>
  );
};

export default BlogLayout;


