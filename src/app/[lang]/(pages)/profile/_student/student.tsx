import Gantt from "@/app/components/Gantt";

/**
 * The DataItem interface represents the shape of the data items.
 */
interface DataItem {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

/**
 * The StudentPage component displays a Gantt chart.
 * @param user The user object.
 * @returns The StudentPage component.
 */
export default function StudentPage({ user }) {
  const datalist: DataItem[] = [
    {
      id: 1,
      row_id: 1,
      name: "Section 1",
      startDate: new Date(2024, 2, 20),
      endDate: new Date(2024, 4, 28),
    },
    {
      id: 2,
      row_id: 2,
      name: "Section 2",
      startDate: new Date(2024, 0, 25),
      endDate: new Date(2024, 2, 20),
    },
    {
      id: 3,
      row_id: 2,
      name: "Section 2",
      startDate: new Date(2024, 4, 28),
      endDate: new Date(2024, 8, 1),
    },
    {
      id: 4,
      row_id: 6,
      name: "Section 6",
      startDate: new Date(2024, 8, 1),
      endDate: new Date(2024, 10, 31),
    },
  ];
  return <Gantt datalist={datalist} />;
}
