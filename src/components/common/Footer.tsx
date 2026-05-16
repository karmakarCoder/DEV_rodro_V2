export const Footer = () => {
  return (
    <footer className="bg-primary-text text-primary p-8 md:px-12 py-12">
      <div className="flex flex-col bg-transparent md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 text-sm font-heading font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-brand-yellow">
            SENDS
          </a>
          <a href="#" className="hover:text-brand-yellow">
            DRAFTS
          </a>
          <a href="#" className="hover:text-brand-yellow">
            ARCHIVE
          </a>
          <a href="#" className="hover:text-brand-yellow">
            INFO
          </a>
        </div>

        <div className="text-xs font-mono opacity-40 uppercase">
          © {new Date().getFullYear()} rodro_DEV ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
