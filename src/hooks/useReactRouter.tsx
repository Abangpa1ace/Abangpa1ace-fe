import { useParams, useLocation, useNavigate } from 'react-router-dom'
import qs, { ParsedQs } from 'qs';
import _isEmpty from 'lodash/isEmpty';

interface ReturnType {
  // useLocation
  key: string;
  hash: string;
  pathname: string;
  query: ParsedQs;
  state: any;

  // useParams
  params: object | null;

  // useNavigate (v5 useHistory)
  navigate: (to: string, options?: { replace: boolean, state: any; }) => void;
}

const useReactRouter = (): ReturnType => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { search } = location
  const parsedSearch = qs.parse(search, { ignoreQueryPrefix: true });

  return { 
    ...location, 
    query: parsedSearch, 
    params : _isEmpty(params) ? null : params, 
    navigate
  }
}

export default useReactRouter