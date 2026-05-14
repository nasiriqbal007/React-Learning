type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
function Drawer({ open, onClose, children }: DrawerProps) {
  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 bg-black/40" />}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-(--background-color) shadow-lg -z-50 transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {children}
      </div>
    </>
  );
}
export default Drawer;
