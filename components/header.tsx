import Settings from './settings/settings';
import LanguageSelector from './language-selector';

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-end border-b border-neutral-200 bg-neutral px-6 py-4 shadow">
      <section className="flex items-center gap-4">
        <LanguageSelector />
        <Settings />
      </section>
    </header>
  );
};

export default Header;
