
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import avatarImg from "../../assets/icon/avatar.jpg";
import {Expand, Shrink} from "lucide-react";

type ProfileToggleMenuProps = {
  isMenuOpen: boolean;
};

type ToggleItemProps = {
  className?: string; // Makes `className` optional
  children: React.ReactNode;
};

function ToggleItem({ className, children }: ToggleItemProps) {
  return (
    <div className={`cursor-pointer py-1 pl-6 hover:bg-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function ProfileToggleMenu({ isMenuOpen }: ProfileToggleMenuProps) {
  const menuOpenClass = isMenuOpen ? "" : "hidden";
  return (
    <div
      className={`absolute right-[-7px] w-54 rounded-sm border-1 border-gray-300 bg-white text-gray-700 ${menuOpenClass}`}
    >
      <div className="flex flex-col border-b-1 py-2">
        <ToggleItem>Vũ Minh Khoa</ToggleItem>
        <ToggleItem className="flex items-center gap-1">
          Số dư: <span className="text-green-500">0đ</span>
        </ToggleItem>
      </div>
      <div className="py-2">
        <ToggleItem className="flex items-center gap-1">
          <img src="../../assets/icon/exit.png" alt="" className="size-4" />
          <span className="inline-block">Đăng xuất</span>
        </ToggleItem>
      </div>
    </div>
  );
}

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 pr-2"
        ref={menuRef}
        onClick={toggleMenu}
      >
        <img
          src={avatarImg}
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />
        <span
          className={`relative after:absolute after:top-1/2 after:ml-1 after:h-2 after:w-2 after:-translate-y-2/3 after:rotate-45 after:border-r-2 after:border-b-2 after:border-gray-500 after:content-['']`}
        >
          Khoavm
        </span>
      </div>
      <ProfileToggleMenu isMenuOpen={isMenuOpen} />
    </div>
  );
}

function Header({
  isExpand,
  setIsExpand,
  currentMenu,
}: {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
  currentMenu: string;
}) {
  return (
    <header className="flex flex-1 h-1 pt-2 pb-2 items-center justify-between bg-white px-6">
      <div className="flex items-center justify-center gap-2 text-xl text-gray-700">

        <div className="cursor-pointer font-bold" onClick={() => setIsExpand((e) => !e)}>
          {isExpand ? <Shrink /> : <Expand/> }
        </div>
        <span>{currentMenu}</span>
      </div>
      <div className="flex flex-row-reverse">
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Header;
