import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
//TODO:
export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
