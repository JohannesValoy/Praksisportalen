import { fetchStudentsEmail } from "../../add/action";
import AddStudentPage from "./addStudent";

export default function Page() {
  return <AddStudentPage wordbook={null} students={fetchStudentsEmail} />;
}
