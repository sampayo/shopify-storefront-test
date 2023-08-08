import React from 'react';

interface IMainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: IMainLayoutProps) {
  const { children } = props;
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <header className="h-20">header</header>
      <main className="flex-1 w-full">{children}</main>
      <footer className="h-20">footer</footer>
    </div>
  );
}

export default MainLayout;
