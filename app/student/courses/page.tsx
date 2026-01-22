'use client';

import React from 'react';
import { PlayCircle, FileText, Clock } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useCourses } from '@/lib/hooks/useCourses';
import { BookOpen } from 'lucide-react';

export default function StudentCoursesPage() {
  const { courses, loading } = useCourses(true); // Published only

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading courses..." />;
  }

  return (
    <div>
      <PageHeader
        title="My Courses"
        description="Continue your medical education journey"
      />

      <div className="p-8">
        {courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses available"
            description="Check back later for new courses"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} hover>
                <CardBody>
                  <div className="w-full h-40 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {course.title.en}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {course.description.en}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      12 lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      8h 30m
                    </span>
                  </div>

                  <Button className="w-full">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

