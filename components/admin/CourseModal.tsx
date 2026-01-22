'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { createCourse, updateCourse, Course } from '@/lib/firebase/firestore';

interface CourseModalProps {
  course?: Course | null;
  onClose: () => void;
  onSave: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onSave }) => {
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setTitleEn(course.title.en);
      setTitleBn(course.title.bn || '');
      setDescriptionEn(course.description.en);
      setDescriptionBn(course.description.bn || '');
      setPublished(course.published);
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        title: { en: titleEn, bn: titleBn },
        description: { en: descriptionEn, bn: descriptionBn },
        published,
        order: course?.order || 0,
      };

      if (course?.id) {
        await updateCourse(course.id, courseData);
      } else {
        await createCourse(courseData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">
            {course ? 'Edit Course' : 'Create New Course'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Course Title (English)"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g., Human Anatomy"
              required
            />
            <Input
              label="Course Title (বাংলা)"
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              placeholder="e.g., মানব শারীরবিদ্যা"
            />
          </div>

          <Textarea
            label="Description (English)"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            placeholder="Detailed course description..."
            required
          />

          <Textarea
            label="Description (বাংলা)"
            value={descriptionBn}
            onChange={(e) => setDescriptionBn(e.target.value)}
            placeholder="বিস্তারিত কোর্স বিবরণ..."
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="published" className="font-medium text-slate-700">
              Publish course immediately
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
