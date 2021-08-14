import { Helmet } from 'react-helmet';
import { Route, Switch, useHistory } from 'react-router-dom';
import logo from '../../assets/images/Logo_ML.png';
import Searchbar from '../../shared/components/Searchbar/Searchbar';
import ProductDetails from '../ProducDetails/ProductDetails';
import SearchResults from '../SearchResults/SearchResults';
import './Search.css';

const Search = () => {
    const routerHistory = useHistory()

    /**
     * this execute when user search
     * @param {*} search user search
     */
    const searchAction = (search) => {
        routerHistory.push(`/items?search=${search}`)
    }

    return (
        <div>
            <Helmet>
                <title>Search | Meli Test</title>
            </Helmet>
            <header className="header">
                <img src={logo} alt="logo" />
                <Searchbar onSearch={searchAction} />
            </header>
            <div className="main-content">
                <Switch>
                    <Route path="/items" exact>
                        <SearchResults />
                    </Route>
                    <Route path="/items/:productId" exact>
                        <ProductDetails />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Search;
