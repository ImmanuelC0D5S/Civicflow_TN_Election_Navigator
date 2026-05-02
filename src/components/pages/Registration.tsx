import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { useProgress } from '../../contexts/ProgressContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { registrationSchema, type RegistrationInput } from '../../lib/validations';
import DOMPurify from 'dompurify';
import { ZodError } from 'zod';

export const Registration: React.FC = () => {
  const { setRegistrationStatus } = useProgress();
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState<RegistrationInput>({
    firstName: '',
    lastName: '',
    dob: '',
    zipCode: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationInput, string>>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'unregistered' | 'registered' | null>(null);

  const handleCheck = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsChecking(true);
    setResult(null);

    // Sanitize inputs
    const sanitizedData = {
      firstName: DOMPurify.sanitize(formData.firstName.trim()),
      lastName: DOMPurify.sanitize(formData.lastName.trim()),
      dob: formData.dob,
      zipCode: DOMPurify.sanitize(formData.zipCode.trim())
    };

    try {
      // Validate with Zod
      registrationSchema.parse(sanitizedData);

      // Simulate API call to Google Civic Info API / TN Election Commision API
      setTimeout(() => {
        setIsChecking(false);
        // Mock logic: if zip code ends in 0, unregistered, else registered
        const isRegistered = !sanitizedData.zipCode.endsWith('0');
        setResult(isRegistered ? 'registered' : 'unregistered');
        setRegistrationStatus(isRegistered);
      }, 1500);
    } catch (err) {
      setIsChecking(false);
      if (err instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach(e => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message;
        });
        setErrors(newErrors);
      }
    }
  }, [formData, setRegistrationStatus]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {language === 'en' ? 'Voter Registration Hub' : 'வாக்காளர் பதிவு மையம்'}
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          {language === 'en' ? 'Check your status or register to vote in under 2 minutes.' : 'உங்கள் நிலையை சரிபார்க்கவும் அல்லது 2 நிமிடங்களுக்குள் வாக்களிக்க பதிவு செய்யவும்.'}
        </p>
      </motion.div>

      <div className="card">
        <div className="border-b border-slate-100 bg-slate-50/50 p-6">
          <h2 className="text-lg font-medium flex items-center">
            <Search className="w-5 h-5 mr-2 text-primary" />
            {language === 'en' ? 'Check Your Registration Status' : 'உங்கள் பதிவு நிலையை சரிபார்க்கவும்'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleCheck} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'en' ? 'First Name' : 'முதல் பெயர்'}
                </label>
                <input
                  type="text"
                  id="firstName"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                {errors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'en' ? 'Last Name' : 'கடைசி பெயர்'}
                </label>
                <input
                  type="text"
                  id="lastName"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
                {errors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'en' ? 'Date of Birth' : 'பிறந்த தேதி'}
                </label>
                <input
                  type="date"
                  id="dob"
                  aria-invalid={!!errors.dob}
                  aria-describedby={errors.dob ? "dob-error" : undefined}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors ${errors.dob ? 'border-red-500' : 'border-slate-300'}`}
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
                {errors.dob && <p id="dob-error" role="alert" className="mt-1 text-sm text-red-600">{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'en' ? 'PIN Code' : 'அஞ்சல் குறியீடு'}
                </label>
                <input
                  type="text"
                  id="zipCode"
                  aria-invalid={!!errors.zipCode}
                  aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                  placeholder="e.g. 600001"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors ${errors.zipCode ? 'border-red-500' : 'border-slate-300'}`}
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
                {errors.zipCode && <p id="zipCode-error" role="alert" className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isChecking}>
              {language === 'en' ? 'Check Status' : 'நிலையை சரிபார்க்கவும்'}
            </Button>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-8 p-6 rounded-xl border ${
                result === 'registered' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              {result === 'registered' ? (
                <div>
                  <h3 className="text-lg font-bold text-green-800 flex items-center mb-2">
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    {language === 'en' ? 'You are registered to vote!' : 'நீங்கள் வாக்களிக்க பதிவு செய்துள்ளீர்கள்!'}
                  </h3>
                  <p className="text-green-700 mb-4">
                    {language === 'en' ? 'Your registration is active in your current constituency.' : 'உங்கள் பதிவு உங்கள் தற்போதைய தொகுதியில் செயலில் உள்ளது.'}
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                    <MapPin className="w-4 h-4 mr-2" /> {language === 'en' ? 'Find Your Polling Place' : 'உங்கள் வாக்குச்சாவடியை கண்டறியவும்'}
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-amber-800 flex items-center mb-2">
                    <AlertCircle className="w-6 h-6 mr-2" />
                    {language === 'en' ? 'We couldn\'t find your registration' : 'உங்கள் பதிவை எங்களால் கண்டுபிடிக்க முடியவில்லை'}
                  </h3>
                  <p className="text-amber-700 mb-4">
                    {language === 'en' ? 'Don\'t worry, you can register online right now. It only takes a few minutes.' : 'கவலைப்பட வேண்டாம், நீங்கள் இப்போது ஆன்லைனில் பதிவு செய்யலாம். இது சில நிமிடங்கள் மட்டுமே ஆகும்.'}
                  </p>
                  <Button variant="primary" className="bg-amber-600 hover:bg-amber-700 text-white border-transparent focus:ring-amber-500">
                    {language === 'en' ? 'Register Online Now' : 'இப்போது ஆன்லைனில் பதிவு செய்யுங்கள்'}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
