import React from "react";

export interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  Component: React.ComponentType;
}
