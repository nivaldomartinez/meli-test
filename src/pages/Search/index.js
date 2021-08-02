import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo_ML.png';
import Searchbar from '../../shared/components/Searchbar';
import ProductDetails from '../ProducDetails';
import SearchResults from '../SearchResults';
import './index.css';

const Search = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const routerHistory = useHistory()

    const searchAction = (search) => {
        routerHistory.push(`/items?search=${search}`)
    }

    return (
        <div>
            <header className="header">
                <img src={logo} alt="logo" />
                <Searchbar onSearch={searchAction} />
            </header>
            <div className="breadcrumb"></div>
            <div className="main-content">
                <Switch>
                    <Route path="/items" exact>
                        <SearchResults query={queryParams.get("search")}></SearchResults>
                    </Route>
                    <Route path="/items/:productId" exact>
                        <ProductDetails></ProductDetails>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Search;
