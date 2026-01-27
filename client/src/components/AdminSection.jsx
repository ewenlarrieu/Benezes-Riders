import React from 'react';

export default function AdminSection({ children }) {
  return (
    <div className="admin-section w-full mt-5 px-5 relative">
      <div className="tracking-custom text-right text-2xl font-bold">admin</div>
      <div className="admin-buttons flex justify-center mt-5 space-x-6 flex-wrap">
        {children}
      </div>
    </div>
  );
}
