'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useCourses } from '@/lib/hooks/useCourses';
import { updateCourse, deleteCourse } from '@/lib/firebase/firestore';
import { BookOpen } from 'lucide-react';
import { CourseModal } from '@/components/admin/CourseModal';
import { Course } from '@/lib/firebase/firestore';

export default function AdminCoursesPage() {
  const { courses, loading, refetch } = useCourses(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleTogglePublish = async (courseId: string, currentStatus: boolean) => {
    try {
      await updateCourse(courseId, { published: !currentStatus });
      refetch();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        refetch();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading courses..." />;
  }

  return (
    <div>
      <PageHeader
        title="Course Management"
        description="Create and manage your courses"
        action={{
          label: 'New Course',
          onClick: () => setIsModalOpen(true),
          icon: <Plus className="w-4 h-4 mr-2" />,
        }}
      />

      <div className="p-8">
        {courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="Create your first course to get started"
            action={{
              label: 'Create Course',
              onClick: () => setIsModalOpen(true),
            }}
          />
        ) : (
          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id} hover>
                <CardBody>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">
                          {course.title.en}
                        </h3>
                        <Badge variant={course.published ? 'success' : 'warning'}>
                          {course.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-4">{course.description.en}</p>
                      {course.title.bn && (
                        <p className="text-sm text-slate-500">বাংলা: {course.title.bn}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublish(course.id!, course.published)}
                      >
                        {course.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCourse(course);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course.id!)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CourseModal
          course={editingCourse}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
          onSave={() => {
            refetch();
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );
}
