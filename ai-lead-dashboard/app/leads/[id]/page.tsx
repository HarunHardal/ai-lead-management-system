"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Lead = {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    api.get("/leads").then((res) => {
      setLeads(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Leads</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Email</th>
            <th>Servis</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.service}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}