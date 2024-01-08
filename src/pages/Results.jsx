import { useSearchParams } from 'react-router-dom';

const Results = () => {
  const [params] = useSearchParams();
  return <div>Results : {params.get('search_query')}</div>;
};
export default Results;
