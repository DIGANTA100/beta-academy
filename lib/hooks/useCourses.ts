import { useState, useEffect } from 'react';
import { getAllCourses, Course } from '../firebase/firestore';

export const useCourses = (publishedOnly: boolean = false) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses(publishedOnly);
      setCourses(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [publishedOnly]);

  return { courses, loading, error, refetch: fetchCourses };
};
