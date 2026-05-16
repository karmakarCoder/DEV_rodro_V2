"use client";
import React, { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Pencil, Trash2, Eye } from "lucide-react";
import DeleteSvg from "@/components/svg/DeleteSvg";

interface ProjectTableProps {
  data: any[];
  globalFilter: string;
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
}

export const ProjectTable = ({
  data,
  globalFilter,
  onEdit,
  onDelete,
}: ProjectTableProps) => {
  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "PROJECT_ID",
        cell: (info) => <span className="font-mono text-[10px]">{info.getValue()?.substring(0, 8)}...</span>,
      }),
      columnHelper.accessor("name", {
        header: "TITLE_AND_TAGS",
        cell: (info) => (
          <span className="uppercase font-black">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "STATUS_LEVEL",
        cell: (info) => (
          <span
            className={`text-[9px] px-2 py-0.5 border-2 border-black font-black ${
              info.getValue() === "PRODUCTION" ? "bg-secondary" : "bg-gray-100"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("stack", {
        header: "TECH_STACK",
        cell: (info) => (
          <span className="text-gray-400">{Array.isArray(info.getValue()) ? info.getValue().join(", ") : info.getValue()}</span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "SYSTEM_ACTIONS",
        cell: (props) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(props.row.original)}
              className="p-2 border-2 border-black hover:bg-secondary transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(props.row.original._id)}
              className="p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
            >
              <DeleteSvg />
            </button>
            <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
              <Eye size={14} />
            </button>
          </div>
        ),
      }),
    ],
    [onEdit, onDelete, columnHelper],
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="border-4 border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-black text-white text-[10px] font-black tracking-widest uppercase"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 border-r border-white/20 last:border-r-0"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-xs font-bold divide-y divide-black/10">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-secondary/10 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 border-r border-black/10 last:border-r-0"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-gray-400 italic font-black uppercase">
                NO_PROJECTS_STAGED_IN_DATABASE
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
