import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Settings from './settings/settings';

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-end border-b border-neutral-200 bg-neutral px-6 py-4 shadow">
      <section className="flex items-center gap-4">
        <Select defaultValue="en">
          <SelectTrigger className="w-[118px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="bd">Bangla</SelectItem>
          </SelectContent>
        </Select>
        <Settings />
      </section>
    </header>
  );
};

export default Header;
