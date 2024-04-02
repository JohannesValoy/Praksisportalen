"use client";
import type { Section } from "knex/types/tables.js";
import { use, useEffect, useState } from "react";

/** @format */
export default function Page() {
  const [sections, setsections] = useState<Section[]>([]);
  useEffect(() => {
    fetch("/api/sections").then((res) => res.json().then(setsections));
  }, []);

  return (
    <div>
      <h1>Sections</h1>
      <ul>
        {sections?.map((section) => (
          <li key={section.id}>{section.name}</li>
        ))}
      </ul>
    </div>
  );
}
