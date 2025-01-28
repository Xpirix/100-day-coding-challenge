// Define Workout type
interface Workout {
  id: number;
  name: string;
  duration: number;
}

interface PaginatedWorkouts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Workout[];
}