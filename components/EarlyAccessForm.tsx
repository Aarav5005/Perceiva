"use client";

import { useState, useEffect } from "react";
import CurvedInput from "./CurvedInput";
import { useForm } from "@formspree/react";

export default function EarlyAccessForm() {
  const [step, setStep] = useState(1);
  const [state, submitToFormspree] = useForm("xpqvklep");
  const [formData, setFormData] = useState({
    role: "",
    school: "",
    city: "",
    board: "",
    challenge: "",
    email: ""
  });

  useEffect(() => {
    const handleSelectRole = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.role) {
        setFormData(prev => ({ ...prev, role: customEvent.detail.role }));
        setStep(2); // Automatically advance to step 2
      }
    };
    
    window.addEventListener('select-role', handleSelectRole);
    return () => window.removeEventListener('select-role', handleSelectRole);
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setStep(6);
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (state.errors) {
      alert("Something went wrong.");
    }
  }, [state.errors]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  
  const handleRoleSelect = (role: string) => {
    setFormData({ ...formData, role });
    setTimeout(nextStep, 300); // slight delay for visual feedback
  };

  const handleBoardSelect = (board: string) => {
    setFormData({ ...formData, board });
    setTimeout(nextStep, 300);
  };

  const handleSubmit = async (email: string) => {
    const finalData = { ...formData, email };
    setFormData(finalData);
    
    await submitToFormspree(finalData);
  };

  // Calculate progress (0 to 100)
  const progress = ((step - 1) / 4) * 100;

  return (
    <section id="early-access-form" className="w-full bg-background py-24 px-6 md:px-12 flex justify-center overflow-hidden">
      <div className="max-w-2xl w-full bg-surface rounded-2xl border border-midtone overflow-hidden relative min-h-[400px] flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-background relative z-10">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12 flex-1 relative flex items-center justify-center">
          
          {/* Q1 */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 1 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : step > 1 ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="font-display text-xl md:text-2xl text-pureWhite mb-6 text-center md:text-left">Who are you?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Principal', 'Teacher', 'Parent', 'Student'].map((role) => (
                <button 
                  key={role} 
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full py-4 px-4 border rounded-lg text-textPrimary font-body transition-colors text-center
                    ${formData.role === role ? 'bg-accent/10 border-accent' : 'bg-background border-background hover:border-accent/50'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 2 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : step > 2 ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="font-display text-xl md:text-2xl text-pureWhite mb-6 text-center md:text-left">Which school are you from?</h3>
            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="School name" 
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full bg-background border border-background focus:border-accent/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none" 
              />
              <input 
                type="text" 
                placeholder="City" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-background border border-background focus:border-accent/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none" 
              />
            </div>
            <div className="flex justify-end">
              <button onClick={nextStep} className="py-3 px-6 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors">
                Continue →
              </button>
            </div>
          </div>

          {/* Q3 */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 3 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : step > 3 ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="font-display text-xl md:text-2xl text-pureWhite mb-6 text-center md:text-left">What board does your school follow?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['IB', 'ICSE', 'CBSE', 'Other'].map((board) => (
                <button 
                  key={board} 
                  onClick={() => handleBoardSelect(board)}
                  className={`w-full py-4 px-4 border rounded-lg text-textPrimary font-body transition-colors text-center
                    ${formData.board === board ? 'bg-accent/10 border-accent' : 'bg-background border-background hover:border-accent/50'}`}
                >
                  {board}
                </button>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 4 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : step > 4 ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="font-display text-xl md:text-2xl text-pureWhite mb-6 text-center md:text-left">What&apos;s your biggest classroom challenge right now?</h3>
            <textarea 
              rows={4} 
              placeholder="Optional" 
              value={formData.challenge}
              onChange={(e) => setFormData({...formData, challenge: e.target.value})}
              className="w-full bg-background border border-background focus:border-accent/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none resize-none mb-6"
            ></textarea>
            <div className="flex justify-between items-center">
              <button onClick={nextStep} className="text-textPrimary/50 text-sm hover:text-textPrimary underline">Skip this question</button>
              <button onClick={nextStep} className="py-3 px-6 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors">
                Continue →
              </button>
            </div>
          </div>

          {/* Q5 */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 5 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : step > 5 ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="font-display text-xl md:text-2xl text-pureWhite mb-6 text-center md:text-left">Last one — your email, so we can reach you.</h3>
            <CurvedInput
              placeholder="your@email.com"
              buttonText={state.submitting ? "Sending..." : "I'm in"}
              theme="dark"
              bend={0}
              height={56}
              width="100%"
              backgroundColor="#0D1F23"
              borderColor="#2D4A53"
              buttonColor="#4A9BAB"
              buttonTextColor="#000000"
              onSubmit={(email: string) => handleSubmit(email)}
            />
          </div>

          {/* Success Step (Step 6) */}
          <div className={`w-full transition-all duration-500 ease-in-out absolute px-8 md:px-12 left-0 ${step === 6 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="font-display text-4xl md:text-5xl text-pureWhite font-bold">You&apos;re on the list.</h3>
              <p className="font-body text-textPrimary/80 text-lg">We&apos;ll reach out personally. Not a newsletter.</p>
              <div className="mt-8 pt-8 border-t border-midtone">
                <span className="font-mono text-xs text-utility">Built by Aarav & Chakrashen · IIT Jodhpur</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
