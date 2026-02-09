const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-[1500ms]"></div>
      <div className="absolute top-10 left-10 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-200"></div>
      <div className="absolute bottom-16 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
    </div>
  );
};

export default BackgroundDecorations;
