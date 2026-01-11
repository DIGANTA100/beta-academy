'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { PlayCircle, FileText, Award, Users, Clock, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: PlayCircle,
      title: 'Expert Video Lectures',
      description: 'High-quality medical lectures from experienced professionals',
    },
    {
      icon: FileText,
      title: 'Comprehensive Notes',
      description: 'Well-structured study materials for every topic',
    },
    {
      icon: Award,
      title: 'Professional Exams',
      description: 'MCQ practice with instant evaluation and feedback',
    },
    {
      icon: Users,
      title: 'Interactive Learning',
      description: 'Engage with instructors and fellow students',
    },
    {
      icon: Clock,
      title: 'Learn At Your Pace',
      description: 'Access content 24/7 from anywhere',
    },
    {
      icon: CheckCircle,
      title: 'Track Progress',
      description: 'Monitor your learning journey and achievements',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Master Medical Sciences
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              with Excellence
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Professional medical education platform designed specifically for MBBS students in Bangladesh. 
            Learn from experts, practice with purpose, and excel in your medical career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="min-w-[200px]">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { value: '500+', label: 'Video Lectures' },
            { value: '50+', label: 'Practice Exams' },
            { value: '1000+', label: 'Active Students' },
          ].map((stat, idx) => (
            <Card key={idx} className="text-center">
              <CardBody>
                <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive learning platform with all the tools and resources for your medical education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} hover>
                  <CardBody>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 border-0">
          <CardBody className="text-center py-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Excel in Your Medical Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of MBBS students who are mastering medical sciences with Beta Academy
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50">
                Get Started Free
              </Button>
            </Link>
          </CardBody>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 Beta Academy. Professional Medical Education Platform.
            </p>
            <p className="text-slate-500 mt-2 text-sm">
              Built for MBBS students in Bangladesh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
