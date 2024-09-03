import React from 'react';

interface ListProps {
  children: React.ReactNode;
}

const List: React.FC<ListProps> = ({ children }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
      {children}
    </ul>
  );
};

export default List;