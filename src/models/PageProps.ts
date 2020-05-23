import PathContext from './PathContext';
import PageResources from './PageResources';
import Data, { SideBarFromServer } from './Data';
interface PageProps {
  data: Data;
  location: Location;
  pageResources?: PageResources;
  pathContext: PathContext & SideBarFromServer;
}

export default PageProps;
