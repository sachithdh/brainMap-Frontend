'use client';

import React, { useState } from 'react';
import NavBar from '../../components/NavBarModel';
import CustomButton from '../../components/CustomButtonModel';
import { Mail, Lock, User, UploadCloud, FileText } from 'lucide-react';
import Link from 'next/link';

const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'mentor' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic here
    if (role === 'mentor') {
      console.log('Registering mentor:', { name, email, password, files });
    } else {
      console.log('Registering student:', { name, email, password });
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Register</h1>
            <p className="text-value3 mt-2">Create your brainMap account</p>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-2 focus:outline-none ${role === 'student' ? 'bg-accent text-white border-accent' : 'bg-white/20 text-white border-white/30 hover:bg-accent/80 hover:text-white'}`}
              onClick={() => setRole('student')}
              type="button"
            >
              Register as Student
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-2 focus:outline-none ${role === 'mentor' ? 'bg-accent text-white border-accent' : 'bg-white/20 text-white border-white/30 hover:bg-accent/80 hover:text-white'}`}
              onClick={() => setRole('mentor')}
              type="button"
            >
              Register as Mentor
            </button>
          </div>
          {role && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="w-5 h-5 text-accent absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="relative">
                <Mail className="w-5 h-5 text-accent absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-accent absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              {role === 'mentor' && (
                <div>
                  <label className="block text-white mb-2 font-semibold">Upload Certifications / Proof / Experience</label>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg border border-white/30 px-4 py-3">
                    <UploadCloud className="w-5 h-5 text-accent" />
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="flex-1 text-white bg-transparent focus:outline-none"
                    />
                  </div>
                  {files && files.length > 0 && (
                    <ul className="mt-2 text-white text-sm">
                      {Array.from(files).map((file, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-accent" /> {file.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <CustomButton
                text="Register"
                type="submit"
                backgroundColor="bg-gradient-to-r from-accent to-info"
                textColor="text-white"
                hoverBackgroundColor="hover:opacity-90"
                width="w-full"
              />
            </form>
          )}
          <div className="text-center text-value3">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-accent hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register; 