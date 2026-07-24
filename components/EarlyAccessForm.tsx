export default function EarlyAccessForm() {
  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-2xl w-full bg-surface rounded-2xl border border-surface overflow-hidden">
        
        {/* Progress Bar (Static) */}
        <div className="w-full h-1 bg-background">
          <div className="h-full bg-teal w-[0%]"></div>
        </div>

        <div className="p-8 md:p-12 space-y-16">
          
          {/* Q1 */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl text-pureWhite">Who are you?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Principal', 'Teacher', 'Parent', 'Student'].map((role) => (
                <button key={role} className="w-full py-4 px-4 bg-background border border-background hover:border-teal/50 rounded-lg text-textPrimary font-body transition-colors text-center">
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl text-pureWhite">Which school are you from?</h3>
            <div className="space-y-4">
              <input type="text" placeholder="School name" className="w-full bg-background border border-background focus:border-teal/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none" />
              <input type="text" placeholder="City" className="w-full bg-background border border-background focus:border-teal/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none" />
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl text-pureWhite">What board does your school follow?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['IB', 'ICSE', 'CBSE', 'Other'].map((board) => (
                <button key={board} className="w-full py-4 px-4 bg-background border border-background hover:border-teal/50 rounded-lg text-textPrimary font-body transition-colors text-center">
                  {board}
                </button>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl text-pureWhite">What&apos;s your biggest classroom challenge right now?</h3>
            <textarea rows={4} placeholder="Optional" className="w-full bg-background border border-background focus:border-teal/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none resize-none"></textarea>
            <button className="text-textPrimary/50 text-sm hover:text-textPrimary underline">Skip this question</button>
          </div>

          {/* Q5 */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl text-pureWhite">Last one — your email, so we can reach you.</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Email address" className="flex-1 bg-background border border-background focus:border-teal/50 rounded-lg px-4 py-4 text-textPrimary font-body outline-none" />
              <button className="py-4 px-8 bg-teal text-background font-bold rounded-lg hover:bg-teal/90 transition-colors shrink-0">
                I&apos;m in →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
