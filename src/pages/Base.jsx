/// <reference types="vite-plugin-svgr/client" />
import { useGlobalContext } from '../context';

const Base = () => {
  const { isNavOpen } = useGlobalContext();

  return (
    <div
      style={{
        marginLeft: isNavOpen ? 'var(--nav-width)' : 'var(--mini-nav-width)',
      }}
    >
      <h2>base page</h2>
    </div>
  );
};
export default Base;
