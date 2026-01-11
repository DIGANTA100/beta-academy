import { useState, useEffect } from 'react';
import { getTopicsByCourse, Topic } from '../firebase/firestore';

export const useTopics = (courseId: string | null) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    if (!courseId) {
      setTopics([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getTopicsByCourse(courseId);
      setTopics(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  return { topics, loading, error, refetch: fetchTopics };
};