import React from "react";
import { useToolsContext } from "../context/ToolsContext";

interface IconProps {
  size?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  setTool: (tool: string) => void;
}

export const CircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#fff",
  strokeColor = "black",
  strokeWidth = 3,
  setTool
}) => {
  return (
    <svg 
      onClick={() => setTool("circle")}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export const TriangleIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#fff",
  strokeColor = "black",
  strokeWidth = 3,
  setTool
}) => {
  return (
    <div className="">
    <svg
    onClick={() => setTool("triangle")}
    className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 20h18L12 4z" />
    </svg>
    </div>
  );
};

export const SquareIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#fff",
  strokeColor = "black",
  strokeWidth = 3,
  setTool
}) => {
  return (
    <svg
    onClick={() => setTool("rectangle")}
    className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  );
};
